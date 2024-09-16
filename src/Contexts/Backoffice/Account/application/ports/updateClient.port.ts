import AddClientDto from "../../domain/dtos/addClient.dto";

export interface IUpdateClient {
  updateClient(
    accountId: number,
    clientId: number,
    accountData: AddClientDto
  ): Promise<number>;
}
