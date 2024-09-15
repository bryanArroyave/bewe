import { Addon } from "../../domain/Addon";
import { IAddonRepository } from "../../domain/AddonRepository";
import { Addon as AddonEntity } from "./Addon.entity";

export class AddonRepository implements IAddonRepository {
  async save(addon: Addon): Promise<number> {
    const _addon = new AddonEntity();
    _addon.name = addon.name.value;
    await _addon.save();
    return _addon.id;
  }
}
