import { INotificable } from "./notification.repository";

export class NotificationFactory {
  private static instance: NotificationFactory;

  private notifiers: Map<string, any> = new Map<string, INotificable>();

  private constructor() {}

  public register(type: string, instance: INotificable): void {
    this.notifiers.set(type, instance);
  }

  public static getInstance(): NotificationFactory {
    if (!NotificationFactory.instance) {
      NotificationFactory.instance = new NotificationFactory();
    }
    return NotificationFactory.instance;
  }

  public get(type: string): INotificable {
    return this.notifiers.get(type);
  }
}
