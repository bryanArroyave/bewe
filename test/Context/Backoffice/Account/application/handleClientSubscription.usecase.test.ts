import { describe, expect } from "@jest/globals";
import { HandleClientSubscriptionUsecase } from "../../../../../src/Contexts/Backoffice/Account/application/handleClientSubscription.usecase";
import mockAccountRepository from "../mocks/accountRepository.mock";
import { Account } from "../../../../../src/Contexts/Backoffice/Account/domain/Account";
import { AccountNotFoundError } from "../../../../../src/Contexts/Backoffice/Account/domain/errors/accountNotFound.error";
import { ClientId } from "../../../../../src/Contexts/Backoffice/Account/domain/valueObjects/ClientId";

describe("HandleClientSubscriptionUsecase", () => {
  let handleClientSubscriptionUsecase: HandleClientSubscriptionUsecase;
  let mockAccount: Account;

  beforeEach(() => {
    handleClientSubscriptionUsecase = new HandleClientSubscriptionUsecase(
      mockAccountRepository
    );
    mockAccount = {
      verifySubscription: jest.fn(),
      handleClientSubscription: jest.fn(),
    } as unknown as Account;
  });

  it("should update the subscription status of the client when account and client exist", async () => {
    const accountId = 1;
    const clientId = 1;
    const newActiveStatus = true;

    mockAccountRepository.getById.mockResolvedValueOnce(mockAccount);

    const result =
      await handleClientSubscriptionUsecase.handleClientSubscription(
        accountId,
        clientId,
        newActiveStatus
      );

    expect(mockAccount.verifySubscription).toHaveBeenCalled();
    expect(mockAccount.handleClientSubscription).toHaveBeenCalledWith(
      new ClientId(clientId),
      newActiveStatus,
      mockAccountRepository
    );
    expect(result).toBe(clientId);
  });

  it("should throw AccountNotFoundError if account does not exist", async () => {
    const accountId = 1;
    const clientId = 1;
    const newActiveStatus = true;

    mockAccountRepository.getById.mockResolvedValueOnce(null);

    await expect(
      handleClientSubscriptionUsecase.handleClientSubscription(
        accountId,
        clientId,
        newActiveStatus
      )
    ).rejects.toThrow(new AccountNotFoundError(accountId));
  });
});
