import { Addon } from "./Addon";

export interface IAddonRepository {
  save(course: Addon): Promise<number>;
  // searchAll(): Promise<Array<Addon>>;
  // getById(id: AddonId): Promise<Addon | null>;
  // getByName(name: AddonName): Promise<Addon | null>;
}
