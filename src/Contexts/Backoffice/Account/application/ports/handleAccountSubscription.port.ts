
export interface IHandleAccountSubscription {
  handleAccountSubscription(
    accountId: number,
    active: string
  ): Promise<number>;
}
