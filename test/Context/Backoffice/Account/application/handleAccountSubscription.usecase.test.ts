import { describe, expect } from "@jest/globals";
import { HandleAccountSubscriptionUsecase } from "../../../../../src/Contexts/Backoffice/Account/application/handleAccountSubscription.usecase";
import mockAccountRepository from "../mocks/accountRepository.mock";
import { Account } from "../../../../../src/Contexts/Backoffice/Account/domain/Account";
import { AccountNotFoundError } from "../../../../../src/Contexts/Backoffice/Account/domain/errors/accountNotFound.error";

describe("HandleAccountSubscriptionUsecase", () => {
  let handleAccountSubscriptionUsecase: HandleAccountSubscriptionUsecase;
  let mockAccount: Account;

  beforeEach(() => {
    handleAccountSubscriptionUsecase = new HandleAccountSubscriptionUsecase(
      mockAccountRepository
    );

    mockAccount = {
      active: false,
    } as unknown as Account;
  });

  it("should update the subscription status of the account when account exists", async () => {
    const accountId = 1;
    const newActiveStatus = true;

    mockAccountRepository.getById.mockResolvedValueOnce(mockAccount);
    mockAccountRepository.save.mockResolvedValueOnce(accountId);

    const result =
      await handleAccountSubscriptionUsecase.handleAccountSubscription(
        accountId,
        newActiveStatus
      );

    expect(mockAccount.active).toBe(newActiveStatus);

    expect(mockAccountRepository.save).toHaveBeenCalledWith(mockAccount);

    expect(result).toBe(accountId);
  });

  it("should throw AccountNotFoundError if account does not exist", async () => {
    const accountId = 1;
    const newActiveStatus = true;

    mockAccountRepository.getById.mockResolvedValueOnce(null);

    await expect(
      handleAccountSubscriptionUsecase.handleAccountSubscription(
        accountId,
        newActiveStatus
      )
    ).rejects.toThrow(new AccountNotFoundError(accountId));
  });
});
