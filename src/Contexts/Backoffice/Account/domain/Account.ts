import { Nullable } from "../../../Shared/domain/Nullable";
import { AggregateRoot } from "../../../Shared/domain/AggregateRoot";
import { AccountId } from "./valueObjects/AccountId";
import { AccountName } from "./valueObjects/AccountName";
import { AccountType } from "./valueObjects/AccountType";
import { Client } from "./Client";
import { IAccountRepository } from "./AccountRepository";
import { ClientId } from "./valueObjects/ClientId";
import { ClientNotFoundError } from "./errors/clientNotFound.error";
import { ClientHasNotActiveSubscriptionError } from "./errors/clientHasNotActiveSubscription.error";
import { AccountHasNotActiveSubscriptionError } from "./errors/accountHasNotActiveSubscription.error";
import { ClientDuplicatedError } from "./errors/clientDuplicated.error";

export class Account extends AggregateRoot {
  id?: AccountId;
  name: AccountName;
  type: AccountType;
  active: boolean;
  clients: Client[];

  constructor(
    id: Nullable<AccountId>,
    name: AccountName,
    type: AccountType,
    active: boolean,
    clients?: Client[]
  ) {
    super();
    if (id) {
      this.id = id;
    }
    this.name = name;
    this.type = type;
    this.active = active;
    this.clients = clients || [];
  }

  static create(
    id: AccountId,
    name: AccountName,
    type: AccountType,
    active: boolean,
    clients?: Client[]
  ): Account {
    return new Account(id, name, type, active, clients);
  }

  static fromPrimitives(plainData: {
    id?: number;
    name: string;
    type: string;
    active: boolean;
    clients: any;
  }): Account {
    return new Account(
      plainData.id ? new AccountId(plainData.id) : null,
      new AccountName(plainData.name),
      new AccountType(plainData.type, AccountType.ACCOUNT_TYPES),
      plainData.active,
      plainData.clients?.map((client: any) => Client.fromPrimitives(client))
    );
  }

  toPrimitives() {
    return {
      id: this.id?.value,
      name: this.name.value,
      type: this.type.value,
      active: this.active,
      clients: this.clients,
    };
  }

  private hasActiveSubscription(): boolean {
    return this.active;
  }

  public verifySubscription(): void {
    if (!this.hasActiveSubscription()) {
      throw new AccountHasNotActiveSubscriptionError(this.id?.value || 0);
    }
  }

  public async addClient(
    accountId: AccountId,
    client: Client,
    accountRepository: IAccountRepository
  ): Promise<void> {
    try {
      await accountRepository.saveClient(accountId, client);
      this.clients.push(client);
    } catch (err: any) {
      if (
        err.message.includes("duplicate key value violates unique constraint")
      ) {
        throw new ClientDuplicatedError();
      }
    }
  }

  public verifyClientSubscription(clientId: ClientId): Client {
    const client = this.findClient(clientId);

    if (!client.hasActiveSubscription()) {
      throw new ClientHasNotActiveSubscriptionError(this.id?.value || 0);
    }

    return client;
  }

  public findClient(clientId: ClientId): Client {
    const client =
      this.clients.find((client) => client.id?.value === clientId.value) ||
      null;

    if (!client) {
      throw new ClientNotFoundError(clientId.value);
    }

    return client;
  }

  public async handleClientSubscription(
    clientId: ClientId,
    active: boolean,
    accountRepository: IAccountRepository
  ): Promise<void> {
    if (!this.id) {
      return;
    }

    const client = this.findClient(clientId);
    client.active = active;

    await accountRepository.saveClient(this.id, client);
  }
}
