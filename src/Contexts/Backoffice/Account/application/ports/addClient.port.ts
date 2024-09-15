import AddClientDto from "../../domain/dtos/addClient.dto";

export interface IAddClient {
  addClient(accountId: number, accountData: AddClientDto): Promise<void>;
}
