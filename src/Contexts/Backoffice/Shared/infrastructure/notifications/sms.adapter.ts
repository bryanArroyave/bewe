import { INotificable } from "../../domain/notification.repository";

export class SMSNotifier implements INotificable {
  constructor() {}

  notify(contactabilityChannel: string, message: string): void {
    console.log(`Cellphone ${contactabilityChannel} MSG: ${message}`);
  }
}
