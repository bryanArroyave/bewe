import { IAccountRepository } from "../domain/AccountRepository";
import { IHandleAccountSubscription } from "./ports/handleAccountSubscription.port";
import { AccountId } from "../domain/valueObjects/AccountId";
import { AccountNotFoundError } from "../domain/errors/accountNotFound.error";

export class HandleAccountSubscriptionUsecase
  implements IHandleAccountSubscription
{
  constructor(private accountRepository: IAccountRepository) {}
  async handleAccountSubscription(
    accountId: number,
    active: boolean
  ): Promise<number> {
    const account = await this.accountRepository.getById(
      new AccountId(accountId)
    );

    if (!account) {
      throw new AccountNotFoundError(accountId);
    }

    account.active = active;

    return this.accountRepository.save(account);
  }
}
