import { IAddonRepository } from "../../../../../src/Contexts/Backoffice/Addon/domain/AddonRepository";

const mockAddonRepository: jest.Mocked<IAddonRepository> = {
  save: jest.fn(),
};

export default mockAddonRepository;
