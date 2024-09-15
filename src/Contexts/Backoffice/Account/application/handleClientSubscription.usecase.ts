import { IAccountRepository } from "../domain/AccountRepository";
import { AccountId } from "../domain/valueObjects/AccountId";
import { AccountNotFoundError } from "../domain/errors/accountNotFound.error";
import { IHandleClientSubscription } from "./ports/handleClientSubscription.port";
import { ClientId } from "../domain/valueObjects/ClientId";

export class HandleClientSubscriotionUsecase
  implements IHandleClientSubscription
{
  constructor(private accountRepository: IAccountRepository) {}
  async handleClientSubscription(
    accountId: number,
    clientId: number,
    active: boolean
  ): Promise<number> {
    const account = await this.accountRepository.getById(
      new AccountId(accountId)
    );

    if (!account) {
      throw new AccountNotFoundError(accountId);
    }

    account.verifySubscription();

    await account.handleClientSubscription(
      new ClientId(clientId),
      active,
      this.accountRepository
    );
    return clientId;
  }
}
