import { AddonName } from "./../../../../../src/Contexts/Backoffice/Addon/domain/valueObjects/AddonName";
import { describe, expect } from "@jest/globals";
import { CreateAddonUsecase } from "../../../../../src/Contexts/Backoffice/Addon/application/createAddon.usecase";
import { Addon } from "../../../../../src/Contexts/Backoffice/Addon/domain/Addon";
import { AddonDuplicatedError } from "../../../../../src/Contexts/Backoffice/Addon/domain/errors/addonDuplicated.error";
import CreateAddonDto from "../../../../../src/Contexts/Backoffice/Addon/domain/dtos/createAddon.dto";
import mockAddonRepository from "../mocks/addonRepository.mock";



describe("CreateAddonUsecase", () => {
  let createAddonUsecase: CreateAddonUsecase;

  beforeEach(() => {
    createAddonUsecase = new CreateAddonUsecase(mockAddonRepository);
  });

  it("should create an addon and return its id if successful", async () => {
    const addonDto: CreateAddonDto = { name: "sms" };
    const addon = new Addon(
      null,
      new AddonName(addonDto.name, AddonName.ADDON_NAMES)
    );
    const id = 1;

    mockAddonRepository.save.mockResolvedValueOnce(id);

    const result = await createAddonUsecase.createAddon(addonDto);

    expect(mockAddonRepository.save).toHaveBeenCalledWith(addon);
    expect(result).toBe(id);
  });

  it("should throw AddonDuplicatedError if the addon already exists", async () => {
    const addonDto: CreateAddonDto = { name: "sms" };

    mockAddonRepository.save.mockRejectedValueOnce(
      new Error("duplicate key value violates unique constraint")
    );

    await expect(createAddonUsecase.createAddon(addonDto)).rejects.toThrow(
      AddonDuplicatedError
    );
  });

  it("should throw an error if saving the addon fails for other reasons", async () => {
    const addonDto: CreateAddonDto = { name: "sms" };

    mockAddonRepository.save.mockRejectedValueOnce(
      new Error("some other error")
    );

    await expect(createAddonUsecase.createAddon(addonDto)).rejects.toThrow(
      "some other error"
    );
  });
});
