import { ClientEmail } from "../domain/valueObjects/ClientEmail";
import { ClientName } from "../domain/valueObjects/ClientName";
import AddClientDto from "../domain/dtos/addClient.dto";
import { IAccountRepository } from "../domain/AccountRepository";
import { AccountId } from "../domain/valueObjects/AccountId";
import { AccountNotFoundError } from "../domain/errors/accountNotFound.error";
import { ClientCellphone } from "../domain/valueObjects/ClientCellphone";
import { IUpdateClient } from "./ports/updateClient.port";
import { ClientId } from "../domain/valueObjects/ClientId";
import { ClientNotFoundError } from "../domain/errors/clientNotFound.error";

export class UpdateClientUsecase implements IUpdateClient {
  constructor(private accountRepository: IAccountRepository) {}

  async updateClient(
    _accountId: number,
    clientId: number,
    accountData: AddClientDto
  ): Promise<number> {
    const accountId = new AccountId(_accountId);
    const account = await this.accountRepository.getById(accountId);

    if (!account) {
      throw new AccountNotFoundError(_accountId);
    }

    account.verifySubscription();

    const client = account.findClient(new ClientId(clientId));

    if (!client) {
      throw new ClientNotFoundError(clientId);
    }

    client.name = new ClientName(accountData.name);
    client.email = new ClientEmail(accountData.email);
    client.cellphone = new ClientCellphone(accountData.cellphone);

    await this.accountRepository.saveClient(accountId, client);
    return clientId;
  }
}
