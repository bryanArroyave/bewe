
export interface IHandleAccountSubscription {
  handleAccountSubscription(
    accountId: number,
    active: boolean
  ): Promise<number>;
}
