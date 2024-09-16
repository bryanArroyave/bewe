import { IAccountRepository } from "../domain/AccountRepository";
import CreateAccountDto from "../domain/dtos/createAccount.dto";
import { AccountName } from "../domain/valueObjects/AccountName";
import { AccountType } from "../domain/valueObjects/AccountType";
import { IUpdateAccount } from "./ports/updateAccount.port";
import { AccountId } from "../domain/valueObjects/AccountId";
import { AccountNotFoundError } from "../domain/errors/accountNotFound.error";

export class UpdateAccountUsecase implements IUpdateAccount {
  constructor(private accountRepository: IAccountRepository) {}

  async updateAccount(
    accountId: number,
    accountDto: CreateAccountDto
  ): Promise<number> {
    const account = await this.accountRepository.getById(
      new AccountId(accountId)
    );

    if (!account) {
      throw new AccountNotFoundError(accountId);
    }

    account.name = new AccountName(accountDto.name);
    account.type = new AccountType(accountDto.type, AccountType.ACCOUNT_TYPES);

    const id = await this.accountRepository.save(account);

    return id;
  }
}
