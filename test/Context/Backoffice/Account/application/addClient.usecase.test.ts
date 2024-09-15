import { describe, expect } from "@jest/globals";
import { AddClientUsecase } from "../../../../../src/Contexts/Backoffice/Account/application/addClient.usecase";
import mockAccountRepository from "../mocks/accountRepository.mock";
import { Account } from "../../../../../src/Contexts/Backoffice/Account/domain/Account";
import { AccountNotFoundError } from "../../../../../src/Contexts/Backoffice/Account/domain/errors/accountNotFound.error";
import AddClientDto from "../../../../../src/Contexts/Backoffice/Account/domain/dtos/addClient.dto";
import { AccountId } from "../../../../../src/Contexts/Backoffice/Account/domain/valueObjects/AccountId";
import { Client } from "../../../../../src/Contexts/Backoffice/Account/domain/Client";

describe("AddClientUsecase", () => {
  let addClientUsecase: AddClientUsecase;
  let mockAccount: Account;

  beforeEach(() => {
    addClientUsecase = new AddClientUsecase(mockAccountRepository);

    mockAccount = {
      verifySubscription: jest.fn(),
      addClient: jest.fn(),
    } as unknown as Account;
  });

  it("should add client successfully", async () => {
    const accountId = 1;
    const clientData: AddClientDto = {
      name: "John Doe",
      email: "john.doe@example.com",
      cellphone: "123456789",
    };

    mockAccountRepository.getById.mockResolvedValueOnce(mockAccount);

    await addClientUsecase.addClient(accountId, clientData);

    expect(mockAccount.verifySubscription).toHaveBeenCalled();

    expect(mockAccount.addClient).toHaveBeenCalledWith(
      new AccountId(accountId),
      expect.any(Client),
      mockAccountRepository
    );
  });

  it("should throw AccountNotFoundError if account does not exist", async () => {
    const accountId = 1;
    const clientData: AddClientDto = {
      name: "John Doe",
      email: "john.doe@example.com",
      cellphone: "123456789",
    };

    mockAccountRepository.getById.mockResolvedValueOnce(null);

    await expect(
      addClientUsecase.addClient(accountId, clientData)
    ).rejects.toThrow(new AccountNotFoundError(accountId));
  });
});
