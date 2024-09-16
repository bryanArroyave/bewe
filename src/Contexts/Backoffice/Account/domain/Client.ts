import { Nullable } from "../../../Shared/domain/Nullable";
import { CustomError } from "../../Shared/errors/Custom.error";
import { clientAddonsDto } from "./dtos/clientAddons.dto";
import { Channel } from "./valueObjects/Channel";
import { ClientEmail } from "./valueObjects/ClientEmail";
import { ClientId } from "./valueObjects/ClientId";
import { ClientName } from "./valueObjects/ClientName";
import { ClientCellphone } from "./valueObjects/ClientCellphone";
import { ChannelQuantityError } from "./errors/channelQuantity.error";
import { Status } from "./valueObjects/Status";

export class Client {
  id?: ClientId;
  name: ClientName;
  email: ClientEmail;
  cellphone: ClientCellphone;
  status: Status;

  constructor(
    id: Nullable<ClientId>,
    name: ClientName,
    email: ClientEmail,
    cellphone: ClientCellphone,
    status: Status
  ) {
    if (id) {
      this.id = id;
    }
    this.name = name;
    this.email = email;
    this.cellphone = cellphone;
    this.status = status;
  }

  static create(
    id: ClientId,
    name: ClientName,
    email: ClientEmail,
    cellphone: ClientCellphone,
    status: Status
  ): Client {
    return new Client(id, name, email, cellphone, status);
  }

  static fromPrimitives(plainData: {
    id?: number;
    name: string;
    email: string;
    cellphone: string;
    status: string;
  }): Client {
    return new Client(
      plainData.id ? new ClientId(plainData.id) : null,
      new ClientName(plainData.name),
      new ClientEmail(plainData.email),
      new ClientCellphone(plainData.cellphone),
      new Status(plainData.status)
    );
  }

  toPrimitives() {
    return {
      id: this.id?.value,
      name: this.name.value,
      email: this.email.value,
      cellphone: this.cellphone.value,
      status: this.status,
    };
  }

  public hasActiveSubscription(): boolean {
    return this.status.value === "active";
  }

  public allowSendMessage(
    channel: Channel,
    addons: clientAddonsDto[]
  ): clientAddonsDto {
    const addon = addons.find((addon) => addon.name === channel.value);

    if (!addon) {
      throw new CustomError(`Addon ${channel.value} not found.`);
    }

    if (addon.quantity <= 0) {
      throw new ChannelQuantityError(channel.value);
    }

    return addon;
  }
}
