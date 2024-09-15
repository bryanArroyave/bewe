import { StringValueObject } from "../../../../Shared/domain/value-object/StringValueObject";
import { InvalidEmailError } from "../errors/invalidEmail.error";
export class ClientEmail extends StringValueObject {
    constructor(value) {
        super(value);
        this.validateIfEmailIsValid(value);
    }
    validateIfEmailIsValid(email) {
        const emailPattern = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
        if (!emailPattern.test(email)) {
            throw new InvalidEmailError();
        }
    }
}
