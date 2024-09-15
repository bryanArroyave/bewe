import { INotificable } from "./notification.repository";

export class NotificationFactory {
  private factory: NotificationFactory;

  private notifiers: Map<string, any> = new Map<string, INotificable>();

  constructor() {
    if (!this.factory) {
      this.factory = this;
    }
  }

  public register(type: string, instance: INotificable): void {
    this.notifiers.set(type, instance);
  }

  public static getInstance(): NotificationFactory {
    return new NotificationFactory();
  }

  public get(type: string): INotificable {
    return this.notifiers.get(type);
  }
}
