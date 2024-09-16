export interface IHandleClientSubscription {
  handleClientSubscription(
    accountId: number,
    clientId: number,
    status: string
  ): Promise<number>;
}
