export interface IHandleClientSubscription {
  handleClientSubscription(
    accountId: number,
    clientId: number,
    active: boolean
  ): Promise<number>;
}
