import { IAccountRepository } from "../domain/AccountRepository";
import { AccountId } from "../domain/valueObjects/AccountId";
import { AccountNotFoundError } from "../domain/errors/accountNotFound.error";
import { IHandleClientSubscription } from "./ports/handleClientSubscription.port";
import { ClientId } from "../domain/valueObjects/ClientId";
import { Status } from "../domain/valueObjects/Status";

export class HandleClientSubscriptionUsecase
  implements IHandleClientSubscription
{
  constructor(private accountRepository: IAccountRepository) {}
  async handleClientSubscription(
    accountId: number,
    clientId: number,
    status: string
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
      new Status(status),
      this.accountRepository
    );
    return clientId;
  }
}
