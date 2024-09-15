import { NotFound } from "../../../Shared/errors/NotFound.error";
import { AddonName } from "../valueObjects/AddonName";
export class AddonNameNotFoundError extends NotFound {
    constructor(type) {
        super(`Addon ${type} not allowed, please use one of the following: ${AddonName.ADDON_NAMES.join(', ')}`);
    }
}
