import { Addon } from "./Addon";

export interface IAddonRepository {
  save(course: Addon): Promise<number>;
}
