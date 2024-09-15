import CreateAccountDto from "../../domain/dtos/createAccount.dto";

export interface ICreateAccount {
	createAccount(accountData: CreateAccountDto): Promise<number>;
}
