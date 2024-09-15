import { CustomError } from "../../../Shared/errors/Custom.error";
export class AccountHasNotActiveSubscriptionError extends CustomError {
    constructor(accountId) {
        super(`Account '${accountId}' has not active subscription`);
    }
}
