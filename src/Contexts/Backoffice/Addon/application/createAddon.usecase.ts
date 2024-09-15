import { IAddonRepository } from "../domain/AddonRepository";
import CreateAddonDto from "../domain/dtos/createAddon.dto";
import { Addon } from "../domain/Addon";
import { AddonName } from "../domain/valueObjects/AddonName";

import { ICreateAddon } from "./ports/createAddon.port";
import { AddonDuplicatedError } from "../domain/errors/addonDuplicated.error";

export class CreateAddonUsecase implements ICreateAddon {
  constructor(private addonRepository: IAddonRepository) {}

  async createAddon(addonDto: CreateAddonDto): Promise<number> {
    const addon = new Addon(null, new AddonName(addonDto.name, AddonName.ADDON_NAMES));

    try {
      const id = await this.addonRepository.save(addon);

      return id;
    } catch (err: any) {
      if (
        err.message.includes("duplicate key value violates unique constraint")
      ) {
        throw new AddonDuplicatedError();
      }

      throw err;
    }
  }
}
