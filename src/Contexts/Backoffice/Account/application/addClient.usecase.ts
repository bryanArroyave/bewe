import { ClientEmail } from "../domain/valueObjects/ClientEmail";
import { ClientName } from "../domain/valueObjects/ClientName";
import { IAddClient } from "./ports/addClient.port";
import AddClientDto from "../domain/dtos/addClient.dto";
import { Client } from "../domain/Client";
import { IAccountRepository } from "../domain/AccountRepository";
import { AccountId } from "../domain/valueObjects/AccountId";
import { AccountNotFoundError } from "../domain/errors/accountNotFound.error";
import { ClientCellphone } from "../domain/valueObjects/ClientCellphone";
import { Status } from "../domain/valueObjects/Status";

export class AddClientUsecase implements IAddClient {
  constructor(private accountRepository: IAccountRepository) {}

  async addClient(
    _accountId: number,
    accountData: AddClientDto
  ): Promise<void> {
    const accountId = new AccountId(_accountId);
    const account = await this.accountRepository.getById(accountId);

    if (!account) {
      throw new AccountNotFoundError(_accountId);
    }

    account.verifySubscription();

    const client = new Client(
      null,
      new ClientName(accountData.name),
      new ClientEmail(accountData.email),
      new ClientCellphone(accountData.cellphone),
      new Status("inactive")
    );

    await account.addClient(accountId, client, this.accountRepository);
  }
}
