import { INotificable } from "../../domain/notification.repository";

export class EmailNotifier implements INotificable {
  constructor() {}

  notify(contactabilityChannel: string, message: string): void {
    console.log(`Email ${contactabilityChannel} MSG: ${message}`);
  }
}
