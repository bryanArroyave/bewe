import { IAccountRepository } from "../domain/AccountRepository";
import { AccountId } from "../domain/valueObjects/AccountId";
import { AccountNotFoundError } from "../domain/errors/accountNotFound.error";
import { IAddAddonToClient } from "./ports/addAddonToClient.port";
import { ClientId } from "../domain/valueObjects/ClientId";

export class AddAddonToClientUsecase implements IAddAddonToClient {
  constructor(private accountRepository: IAccountRepository) {}

  async addAddonToClient(
    accountId: number,
    clientId: number,
    addonId: number,
    quantity: number
  ): Promise<void> {
    const account = await this.accountRepository.getById(
      new AccountId(accountId)
    );

    if (!account) {
      throw new AccountNotFoundError(accountId);
    }

    account.verifySubscription();
    account.verifyClientSubscription(new ClientId(clientId));

    await this.accountRepository.rechargeClientAddon(
      new ClientId(clientId),
      addonId,
      quantity
    );
  }
}
