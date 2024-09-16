import { WhatsappNotifier } from "./../../../../../src/Contexts/Backoffice/Shared/infrastructure/notifications/whatsapp.adapter";
import { SMSNotifier } from "./../../../../../src/Contexts/Backoffice/Shared/infrastructure/notifications/sms.adapter";
import { EmailNotifier } from "./../../../../../src/Contexts/Backoffice/Shared/infrastructure/notifications/email.adapter";
import { describe, expect } from "@jest/globals";
import { NotifyUsecase } from "../../../../../src/Contexts/Backoffice/Account/application/notify.usecase";
import { AccountNotFoundError } from "../../../../../src/Contexts/Backoffice/Account/domain/errors/accountNotFound.error";
import { ClientId } from "../../../../../src/Contexts/Backoffice/Account/domain/valueObjects/ClientId";
import { NotificationFactory } from "../../../../../src/Contexts/Backoffice/Shared/domain/notification.factory";
import { AccountId } from "../../../../../src/Contexts/Backoffice/Account/domain/valueObjects/AccountId";
import { ChannelNotFoundError } from "../../../../../src/Contexts/Backoffice/Account/domain/errors/channelNotFound.error";

describe("NotifyUsecase", () => {
  let notifyUsecase: NotifyUsecase;
  let accountRepository: any;

  const notificationFactory = NotificationFactory.getInstance();
  notificationFactory.register("email", new EmailNotifier());
  notificationFactory.register("sms", new SMSNotifier());
  notificationFactory.register("whatsapp", new WhatsappNotifier());

  beforeEach(() => {
    accountRepository = {
      getById: jest.fn(),
      getClientAddons: jest.fn(),
      decreaseClientAddon: jest.fn(),
    };

    notifyUsecase = new NotifyUsecase(accountRepository);
  });

  it("should throw AccountNotFoundError when account does not exist", async () => {
    accountRepository.getById.mockResolvedValue(null); // Simula que la cuenta no existe

    await expect(notifyUsecase.notify(1, 1, "sms")).rejects.toThrow(
      AccountNotFoundError
    );

    expect(accountRepository.getById).toHaveBeenCalledWith(new AccountId(1));
  });

  it("should throw an error if the account subscription is not active", async () => {
    const mockAccount = {
      verifySubscription: jest.fn(() => {
        throw new Error("Subscription inactive");
      }),
    };

    accountRepository.getById.mockResolvedValue(mockAccount);

    await expect(notifyUsecase.notify(1, 1, "sms")).rejects.toThrow(
      "Subscription inactive"
    );

    expect(mockAccount.verifySubscription).toHaveBeenCalled();
  });

  it("should throw an error if the client subscription is not active", async () => {
    const mockAccount = {
      verifySubscription: jest.fn(),
      verifyClientSubscription: jest.fn(() => {
        throw new Error("Client subscription inactive");
      }),
    };

    accountRepository.getById.mockResolvedValue(mockAccount);

    await expect(notifyUsecase.notify(1, 1, "sms")).rejects.toThrow(
      "Client subscription inactive"
    );

    expect(mockAccount.verifySubscription).toHaveBeenCalled();
    expect(mockAccount.verifyClientSubscription).toHaveBeenCalledWith(
      new ClientId(1)
    );
  });

  it("should throw an error if the notification channel is invalid", async () => {
    const mockAccount = {
      verifySubscription: jest.fn(),
      verifyClientSubscription: jest.fn().mockReturnValue({
        allowSendMessage: jest.fn().mockImplementation(() => {
          throw new Error("Invalid channel");
        }),
      }),
    };

    accountRepository.getById.mockResolvedValue(mockAccount);
    accountRepository.getClientAddons.mockResolvedValue([{ addonId: 1 }]);

    await expect(notifyUsecase.notify(1, 1, "invalid_channel")).rejects.toThrow(
      new ChannelNotFoundError("invalid_channel")
    );
  });
});
