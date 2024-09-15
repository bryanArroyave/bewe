import { describe, expect } from "@jest/globals";
import { AddAddonToClientUsecase } from "../../../../../src/Contexts/Backoffice/Account/application/addAddonToClient.usecase";
import mockAccountRepository from "../mocks/accountRepository.mock";
import { Account } from "../../../../../src/Contexts/Backoffice/Account/domain/Account";
import { ClientId } from "../../../../../src/Contexts/Backoffice/Account/domain/valueObjects/ClientId";
import { AccountNotFoundError } from "../../../../../src/Contexts/Backoffice/Account/domain/errors/accountNotFound.error";

describe("AddAddonToClientUsecase", () => {
  let addAddonToClientUsecase: AddAddonToClientUsecase;
  let mockAccount: Account;

  beforeEach(() => {
    addAddonToClientUsecase = new AddAddonToClientUsecase(
      mockAccountRepository
    );

    mockAccount = {
      verifySubscription: jest.fn(),
      verifyClientSubscription: jest.fn(),
    } as unknown as Account;
  });

  it("should add addon to client successfully", async () => {
    const accountId = 1;
    const clientId = 1;
    const addonId = 100;
    const quantity = 5;

    mockAccountRepository.getById.mockResolvedValueOnce(mockAccount);

    await addAddonToClientUsecase.addAddonToClient(
      accountId,
      clientId,
      addonId,
      quantity
    );

    expect(mockAccount.verifySubscription).toHaveBeenCalled();
    expect(mockAccount.verifyClientSubscription).toHaveBeenCalledWith(
      new ClientId(clientId)
    );

    expect(mockAccountRepository.rechargeClientAddon).toHaveBeenCalledWith(
      new ClientId(clientId),
      addonId,
      quantity
    );
  });

  it("should throw AccountNotFoundError if account does not exist", async () => {
    const accountId = 1;
    const clientId = 1;
    const addonId = 100;
    const quantity = 5;

    mockAccountRepository.getById.mockResolvedValueOnce(null);

    await expect(
      addAddonToClientUsecase.addAddonToClient(
        accountId,
        clientId,
        addonId,
        quantity
      )
    ).rejects.toThrow(new AccountNotFoundError(accountId));
  });
});
