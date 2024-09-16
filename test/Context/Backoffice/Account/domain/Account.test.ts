import { AccountHasNotActiveSubscriptionError } from './../../../../../src/Contexts/Backoffice/Account/domain/errors/accountHasNotActiveSubscription.error';
import { IAccountRepository } from "./../../../../../src/Contexts/Backoffice/Account/domain/AccountRepository";
import { AccountTypeNotFoundError } from "./../../../../../src/Contexts/Backoffice/Account/domain/errors/accountTypeNotFound.error";
import { Account } from "../../../../../src/Contexts/Backoffice/Account/domain/Account";
import { AccountId } from "../../../../../src/Contexts/Backoffice/Account/domain/valueObjects/AccountId";
import { AccountName } from "../../../../../src/Contexts/Backoffice/Account/domain/valueObjects/AccountName";
import { AccountType } from "../../../../../src/Contexts/Backoffice/Account/domain/valueObjects/AccountType";
import { Client } from "../../../../../src/Contexts/Backoffice/Account/domain/Client";
import { ClientName } from "../../../../../src/Contexts/Backoffice/Account/domain/valueObjects/ClientName";
import { ClientEmail } from "../../../../../src/Contexts/Backoffice/Account/domain/valueObjects/ClientEmail";
import { ClientCellphone } from "../../../../../src/Contexts/Backoffice/Account/domain/valueObjects/ClientCellphone";
import { ClientDuplicatedError } from "../../../../../src/Contexts/Backoffice/Account/domain/errors/clientDuplicated.error";
import { Status } from '../../../../../src/Contexts/Backoffice/Account/domain/valueObjects/Status';

describe("AddAddonToClientUsecase", () => {
  let accountRepository: IAccountRepository;

  true;
  beforeEach(() => {
    accountRepository = {
      saveClient: jest.fn(),
    } as unknown as IAccountRepository;
  });
  it("should fail when account type is not allowed", () => {
    expect(
      () =>
        new Account(
          new AccountId(1),
          new AccountName("John"),
          new AccountType("basic", AccountType.ACCOUNT_TYPES),
          new Status("active")
        )
    ).toThrow(new AccountTypeNotFoundError("basic"));
  });

  it("should add a client to the account", async () => {
    const client = new Client(
      null,
      new ClientName("John Doe"),
      new ClientEmail("john@example.com"),
      new ClientCellphone("1234567890"),
      new Status("active")
    );

    const account = Account.fromPrimitives({
      id: 1,
      name: "John",
      type: "health",
      status: "active",
      clients: [],
    });

    accountRepository.saveClient = jest.fn().mockResolvedValue(undefined);
    await account.addClient(account.id!, client, accountRepository);

    expect(account.clients).toContain(client);
    expect(accountRepository.saveClient).toHaveBeenCalledWith(
      account.id,
      client
    );
  });

  it("should throw ClientDuplicatedError when client already exists", async () => {
    const client = new Client(
      null,
      new ClientName("John Doe"),
      new ClientEmail("john@example.com"),
      new ClientCellphone("1234567890"),
      new Status("active")
    );

    const account = Account.fromPrimitives({
      id: 1,
      name: "John",
      type: "health",
      status: "active",
      clients: [],
    });
    accountRepository.saveClient = jest
      .fn()
      .mockRejectedValue(
        new Error("duplicate key value violates unique constraint")
      );

    await expect(
      account.addClient(account.id!, client, accountRepository)
    ).rejects.toThrow(ClientDuplicatedError);
  });

  it("should throw an error when account is inactive", async () => {
    const account = Account.fromPrimitives({
      id: 1,
      name: "John",
      type: "health",
      status: "inactive",
      clients: [],
    });

    expect(() => account.verifySubscription()).toThrow(
      new AccountHasNotActiveSubscriptionError(account.id!.value)
    );
  });
});
