import { Account } from "./Account";
import { Client } from "./Client";
import { clientAddonsDto } from "./dtos/clientAddons.dto";
import { AccountId } from "./valueObjects/AccountId";
import { ClientId } from "./valueObjects/ClientId";

export interface IAccountRepository {
  save(course: Account): Promise<number>;
  saveClient(accountId: AccountId, clientData: Client): Promise<void>;
  getById(id: AccountId): Promise<Account | null>;
  rechargeClientAddon(
    clientId: ClientId,
    addonId: number,
    quantity: number
  ): Promise<void>;
  decreaseClientAddon(
    clientId: ClientId,
    addonId: number,
    quantity: number
  ): Promise<void>;
  getClientAddons(
    accountId: AccountId,
    clientId: AccountId
  ): Promise<clientAddonsDto[]>;
}
