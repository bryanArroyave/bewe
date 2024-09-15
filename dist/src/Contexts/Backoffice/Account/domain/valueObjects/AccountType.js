import { EnumValueObject } from "../../../../Shared/domain/value-object/EnumValueObject";
import { AccountTypeNotFoundError } from "../errors/accountTypeNotFound.error";
export class AccountType extends EnumValueObject {
    throwErrorForInvalidValue(value) {
        throw new AccountTypeNotFoundError(value);
    }
}
AccountType.ACCOUNT_TYPES = ["wellness", "health"];
