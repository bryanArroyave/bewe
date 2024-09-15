import { Nullable } from "../../../Shared/domain/Nullable";
import { CustomError } from "../../Shared/errors/Custom.error";
import { clientAddonsDto } from "./dtos/clientAddons.dto";
import { ChannelQuantityError } from "./errors/ChannelQuantity.error";
import { Channel } from "./valueObjects/Channel";
import { ClientEmail } from "./valueObjects/ClientEmail";
import { ClientId } from "./valueObjects/ClientId";
import { ClientName } from "./valueObjects/ClientName";
import { ClientCellphone } from "./valueObjects/ClientCellphone";

export class Client {
  id?: ClientId;
  name: ClientName;
  email: ClientEmail;
  cellphone: ClientCellphone;
  active: boolean;

  constructor(
    id: Nullable<ClientId>,
    name: ClientName,
    email: ClientEmail,
    cellphone: ClientCellphone,
    active: boolean
  ) {
    if (id) {
      this.id = id;
    }
    this.name = name;
    this.email = email;
    this.cellphone = cellphone;
    this.active = active;
  }

  static create(
    id: ClientId,
    name: ClientName,
    email: ClientEmail,
    cellphone: ClientCellphone,
    active: boolean
  ): Client {
    return new Client(id, name, email, cellphone, active);
  }

  static fromPrimitives(plainData: {
    id?: number;
    name: string;
    email: string;
    cellphone: string;
    active: boolean;
  }): Client {
    return new Client(
      plainData.id ? new ClientId(plainData.id) : null,
      new ClientName(plainData.name),
      new ClientEmail(plainData.email),
      new ClientCellphone(plainData.cellphone),
      plainData.active
    );
  }

  toPrimitives() {
    return {
      id: this.id?.value,
      name: this.name.value,
      email: this.email.value,
      cellphone: this.cellphone.value,
      active: this.active,
    };
  }

  public hasActiveSubscription(): boolean {
    return this.active;
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
