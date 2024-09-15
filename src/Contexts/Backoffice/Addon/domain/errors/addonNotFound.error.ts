import { NotFound } from "../../../Shared/errors/NotFound.error";

export class AddonNotFoundError extends NotFound {
    constructor() {
        super(`Addon not found`);
    }

}
