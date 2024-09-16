import CreateAccountDto from "../../domain/dtos/createAccount.dto";

export interface IUpdateAccount {
  updateAccount(
    accountId: number,
    accountData: CreateAccountDto
  ): Promise<number>;
}
