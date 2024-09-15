export interface INotificable {
  notify(contactabilityChannel: string, message: string): void;
}
