export interface IAddAddonToClient {
  addAddonToClient(
    accountId: number,
    clientId: number,
    addonId: number,
    quantity: number
  ): Promise<void>;
}
