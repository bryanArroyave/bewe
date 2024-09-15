import { INotificable } from "../../domain/notification.repository";

export class WhatsappNotifier implements INotificable {
  constructor() {}

  notify(contactabilityChannel: string, message: string): void {
    console.log(`Whatsapp ${contactabilityChannel} MSG: ${message}`);
  }
}
