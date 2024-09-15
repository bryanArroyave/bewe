import { CustomError } from "../../../Shared/errors/Custom.error";
export class InvalidEmailError extends CustomError {
    constructor() {
        super("Invalid email");
    }
}
