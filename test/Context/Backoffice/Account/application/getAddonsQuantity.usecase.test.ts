import { describe, expect } from "@jest/globals";
import { GetAddonsQuantityUsecase } from "../../../../../src/Contexts/Backoffice/Account/application/getAddonsQuantity.usecase";
import mockAccountRepository from "../mocks/accountRepository.mock";
import { Account } from "../../../../../src/Contexts/Backoffice/Account/domain/Account";
import { AccountNotFoundError } from "../../../../../src/Contexts/Backoffice/Account/domain/errors/accountNotFound.error";
import { clientAddonsDto } from "../../../../../src/Contexts/Backoffice/Account/domain/dtos/clientAddons.dto";
import { ClientId } from "../../../../../src/Contexts/Backoffice/Account/domain/valueObjects/ClientId";

describe("GetAddonsQuantityUsecase", () => {
  let getAddonsQuantityUsecase: GetAddonsQuantityUsecase;
  let mockAccount: Account;

  beforeEach(() => {
    getAddonsQuantityUsecase = new GetAddonsQuantityUsecase(
      mockAccountRepository
    );

    mockAccount = {
      verifySubscription: jest.fn(),
      verifyClientSubscription: jest.fn(),
    } as unknown as Account;
  });

  it("should return the list of addons with their quantities if account and client are active", async () => {
    const accountId = 1;
    const clientId = 2;
    const addons: clientAddonsDto[] = [
      { name: "SMS", quantity: 3, addonId: 1 },
      { name: "Storage", quantity: 5, addonId: 1 },
    ];

    mockAccountRepository.getById.mockResolvedValueOnce(mockAccount);
    mockAccountRepository.getClientAddons.mockResolvedValueOnce(addons);

    const result = await getAddonsQuantityUsecase.getAddonsQuantity(
      accountId,
      clientId
    );

    expect(mockAccount.verifySubscription).toHaveBeenCalled();
    expect(mockAccount.verifyClientSubscription).toHaveBeenCalledWith(
      new ClientId(clientId)
    );

    expect(result).toEqual(addons);
  });

  it("should throw AccountNotFoundError if account does not exist", async () => {
    const accountId = 1;
    const clientId = 2;

    mockAccountRepository.getById.mockResolvedValueOnce(null);

    await expect(
      getAddonsQuantityUsecase.getAddonsQuantity(accountId, clientId)
    ).rejects.toThrow(new AccountNotFoundError(accountId));
  });
});
