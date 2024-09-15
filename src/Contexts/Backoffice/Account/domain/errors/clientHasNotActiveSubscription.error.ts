import { CustomError } from "../../../Shared/errors/Custom.error";

export class ClientHasNotActiveSubscriptionError extends CustomError {
    constructor(clientId: number) {
        super(`Client '${clientId}' has not active subscription`);
    }

}
