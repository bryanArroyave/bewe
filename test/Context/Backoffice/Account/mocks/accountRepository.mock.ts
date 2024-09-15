import { IAccountRepository } from "../../../../../src/Contexts/Backoffice/Account/domain/AccountRepository";

const mockAccountRepository: jest.Mocked<IAccountRepository> = {
  save: jest.fn(),
  saveClient: jest.fn(),
  getById: jest.fn(),
  rechargeClientAddon: jest.fn(),
  decreaseClientAddon: jest.fn(),
  getClientAddons: jest.fn(),
};

export default mockAccountRepository;
