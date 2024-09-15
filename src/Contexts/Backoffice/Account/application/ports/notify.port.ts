export interface INotify {
  notify(accountId: number, clientId: number, channel : string): Promise<void>;
}
