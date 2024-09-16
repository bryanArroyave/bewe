import { IAccountRepository } from "../domain/AccountRepository";
import { AccountId } from "../domain/valueObjects/AccountId";
import { AccountNotFoundError } from "../domain/errors/accountNotFound.error";
import { ClientId } from "../domain/valueObjects/ClientId";
import { INotify } from "./ports/notify.port";
import { Channel } from "../domain/valueObjects/Channel";
import { NotificationFactory } from "../../Shared/domain/notification.factory";

export class NotifyUsecase implements INotify {
  constructor(private accountRepository: IAccountRepository) {}
  async notify(
    accountId: number,
    clientId: number,
    channel: string
  ): Promise<void> {
    const account = await this.accountRepository.getById(
      new AccountId(accountId)
    );

    if (!account) {
      throw new AccountNotFoundError(accountId);
    }

    account.verifySubscription();
    const client = account.verifyClientSubscription(new ClientId(clientId));

    const addons = await this.accountRepository.getClientAddons(
      new AccountId(accountId),
      new ClientId(clientId)
    );

    const addon = client.allowSendMessage(
      new Channel(channel, Channel.TYPES),
      addons
    );

    const contactabilities: any = {
      sms: client.cellphone.value,
      whatsapp: client.cellphone.value,
      email: client.email.value,
    };

    NotificationFactory.getInstance()
      .get(channel)
      .notify(contactabilities[channel], "Notification message");

    await this.accountRepository.decreaseClientAddon(
      new ClientId(clientId),
      addon.addonId,
      1
    );
  }
}
