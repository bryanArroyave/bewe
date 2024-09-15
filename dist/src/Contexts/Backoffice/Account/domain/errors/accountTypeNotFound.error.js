import { NotFound } from "../../../Shared/errors/NotFound.error";
import { AccountType } from "../valueObjects/AccountType";
export class AccountTypeNotFoundError extends NotFound {
    constructor(type) {
        super(`Account type ${type} not allowed, please use one of the following: ${AccountType.ACCOUNT_TYPES.join(', ')}`);
    }
}
