import { CustomError } from "../../../Shared/errors/Custom.error";
export class AddonDuplicatedError extends CustomError {
    constructor() {
        super(`Addon duplicated`);
    }
}
