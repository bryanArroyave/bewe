import { clientAddonsDto } from "../../domain/dtos/clientAddons.dto";

export interface IGetAddonsQuantity {
  getAddonsQuantity(
    accountId: number,
    clientId: number
  ): Promise<clientAddonsDto[]>;
}
