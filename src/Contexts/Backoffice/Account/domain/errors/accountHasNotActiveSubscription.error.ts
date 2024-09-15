import { CustomError } from "../../../Shared/errors/Custom.error";

export class AccountHasNotActiveSubscriptionError extends CustomError {
    constructor(accountId: number) {
        super(`Account '${accountId}' has not active subscription`);
    }

}
