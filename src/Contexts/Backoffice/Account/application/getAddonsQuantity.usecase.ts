import { IAccountRepository } from "../domain/AccountRepository";
import { AccountId } from "../domain/valueObjects/AccountId";
import { AccountNotFoundError } from "../domain/errors/accountNotFound.error";
import { ClientId } from "../domain/valueObjects/ClientId";
import { IGetAddonsQuantity } from "./ports/getAddonsQuantity.port";
import { clientAddonsDto } from "../domain/dtos/clientAddons.dto";

export class GetAddonsQuantityUsecase implements IGetAddonsQuantity {
  constructor(private accountRepository: IAccountRepository) {}

  async getAddonsQuantity(
    accountId: number,
    clientId: number
  ): Promise<clientAddonsDto[]> {
    
    console.log(accountId, clientId);
    

    const account = await this.accountRepository.getById(
      new AccountId(accountId)
    );

    console.log(account, "account");
    

    if (!account) {
      throw new AccountNotFoundError(accountId);
    }

    account.verifySubscription();
    account.verifyClientSubscription(new ClientId(clientId));

    return this.accountRepository.getClientAddons(
      new AccountId(accountId),
      new ClientId(clientId)
    );
  }
}
