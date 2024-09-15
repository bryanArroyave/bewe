import { describe, expect } from "@jest/globals";
import { CreateAccountUsecase } from "../../../../../src/Contexts/Backoffice/Account/application/createAccount.usecase";
import mockAccountRepository from "../mocks/accountRepository.mock";
import CreateAccountDto from "../../../../../src/Contexts/Backoffice/Account/domain/dtos/createAccount.dto";
import { Account } from "../../../../../src/Contexts/Backoffice/Account/domain/Account";
import { AccountDuplicatedError } from "../../../../../src/Contexts/Backoffice/Account/domain/errors/accountDuplicated.error";
import { AccountTypeNotFoundError } from "../../../../../src/Contexts/Backoffice/Account/domain/errors/accountTypeNotFound.error";

describe("CreateAccountUsecase", () => {
  let createAccountUsecase: CreateAccountUsecase;

  beforeEach(() => {
    createAccountUsecase = new CreateAccountUsecase(mockAccountRepository);
  });

  it("should create an account successfully", async () => {
    const accountDto: CreateAccountDto = {
      name: "Test Account",
      type: "health",
    };
    const accountId = 1;

    mockAccountRepository.save.mockResolvedValueOnce(accountId);

    const result = await createAccountUsecase.createAccount(accountDto);

    expect(mockAccountRepository.save).toHaveBeenCalledWith(
      expect.any(Account)
    );
    expect(result).toBe(accountId);
  });

  it("should throw an AccountDuplicatedError when there is a unique key conflict", async () => {
    const accountDto: CreateAccountDto = {
      name: "Test Account",
      type: "health",
    };

    mockAccountRepository.save.mockRejectedValueOnce(
      new Error("duplicate key value violates unique constraint")
    );

    await expect(
      createAccountUsecase.createAccount(accountDto)
    ).rejects.toThrow(AccountDuplicatedError);
  });

  it("should throw a generic error if a failure occurs in the repository", async () => {
    const accountDto: CreateAccountDto = {
      name: "Test Account",
      type: "health",
    };
    const errorMessage = "Unexpected database error";

    mockAccountRepository.save.mockRejectedValueOnce(new Error(errorMessage));

    await expect(
      createAccountUsecase.createAccount(accountDto)
    ).rejects.toThrow(errorMessage);
  });


  it("should throw an error when the type is not within the allowed list", async () => {
    const accountDto: CreateAccountDto = {
      name: "Test Account",
      type: "basic",
    };
    const errorMessage = new AccountTypeNotFoundError("basic")

    mockAccountRepository.save.mockRejectedValueOnce(errorMessage);

    await expect(
      createAccountUsecase.createAccount(accountDto)
    ).rejects.toThrow(errorMessage.message);
  });
});
