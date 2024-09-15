import { ICreateAccount } from "./ports/createAccount.port";
import { AccountDuplicatedError } from "../domain/errors/accountDuplicated.error";
import { Account } from "../domain/Account";
import { IAccountRepository } from "../domain/AccountRepository";
import CreateAccountDto from "../domain/dtos/createAccount.dto";
import { AccountName } from "../domain/valueObjects/AccountName";
import { AccountType } from "../domain/valueObjects/AccountType";

export class CreateAccountUsecase implements ICreateAccount {
  constructor(private accountRepository: IAccountRepository) {}

  async createAccount(accountDto: CreateAccountDto): Promise<number> {
    const account = new Account(
      null,
      new AccountName(accountDto.name),
      new AccountType(accountDto.type, AccountType.ACCOUNT_TYPES),
      false
    );

    try {
      const id = await this.accountRepository.save(account);

      return id;
    } catch (err: any) {
      if (
        err.message.includes("duplicate key value violates unique constraint")
      ) {
        throw new AccountDuplicatedError();
      }

      throw err;
    }
  }
}
