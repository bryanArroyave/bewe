import { IAccountRepository } from "../domain/AccountRepository";
import { IHandleAccountSubscription } from "./ports/handleAccountSubscription.port";
import { AccountId } from "../domain/valueObjects/AccountId";
import { AccountNotFoundError } from "../domain/errors/accountNotFound.error";
import { Status } from "../domain/valueObjects/Status";

export class HandleAccountSubscriptionUsecase
  implements IHandleAccountSubscription
{
  constructor(private accountRepository: IAccountRepository) {}
  async handleAccountSubscription(
    accountId: number,
    status: string
  ): Promise<number> {
    const account = await this.accountRepository.getById(
      new AccountId(accountId)
    );

    if (!account) {
      throw new AccountNotFoundError(accountId);
    }

    account.status = new Status(status);

    return this.accountRepository.save(account);
  }
}
