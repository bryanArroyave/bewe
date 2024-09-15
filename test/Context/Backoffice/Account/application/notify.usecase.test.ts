import { describe, expect } from "@jest/globals";
import { NotifyUsecase } from "../../../../../src/Contexts/Backoffice/Account/application/notify.usecase";
import mockAccountRepository from "../mocks/accountRepository.mock";
import { Account } from "../../../../../src/Contexts/Backoffice/Account/domain/Account";
import { AccountNotFoundError } from "../../../../../src/Contexts/Backoffice/Account/domain/errors/accountNotFound.error";
import { ClientId } from "../../../../../src/Contexts/Backoffice/Account/domain/valueObjects/ClientId";
import { Client } from "../../../../../src/Contexts/Backoffice/Account/domain/Client";
import { clientAddonsDto } from "../../../../../src/Contexts/Backoffice/Account/domain/dtos/clientAddons.dto";

describe("NotifyUsecase", () => {
  let notifyUsecase: NotifyUsecase;
  let mockAccount: Account;
  let mockClient: Client;

  beforeEach(() => {
    notifyUsecase = new NotifyUsecase(mockAccountRepository);

    mockClient = {
      allowSendMessage: jest.fn().mockReturnValue({ addonId: 1 }),
    } as unknown as Client;

    mockAccount = {
      verifySubscription: jest.fn(),
      verifyClientSubscription: jest.fn().mockReturnValue(mockClient),
    } as unknown as Account;
  });

  it("should send a notification if account and client exist", async () => {
    const accountId = 1;
    const clientId = 1;
    const channel = "email";
    const addons: clientAddonsDto[] = [
      { addonId: 1, quantity: 5, name: "sms" },
    ];

    mockAccountRepository.getById.mockResolvedValueOnce(mockAccount);
    mockAccountRepository.getClientAddons.mockResolvedValueOnce(addons);
    mockAccountRepository.decreaseClientAddon.mockResolvedValueOnce();

    await notifyUsecase.notify(accountId, clientId, channel);

    expect(mockAccount.verifySubscription).toHaveBeenCalled();
    expect(mockAccount.verifyClientSubscription).toHaveBeenCalledWith(
      new ClientId(clientId)
    );

    expect(mockAccountRepository.decreaseClientAddon).toHaveBeenCalledWith(
      new ClientId(clientId),
      1,
      1
    );
  });

  it("should throw AccountNotFoundError if account does not exist", async () => {
    const accountId = 1;
    const clientId = 1;
    const channel = "email";

    mockAccountRepository.getById.mockResolvedValueOnce(null);

    await expect(
      notifyUsecase.notify(accountId, clientId, channel)
    ).rejects.toThrow(new AccountNotFoundError(accountId));
  });
});
