var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { AccountId } from "../domain/valueObjects/AccountId";
import { AccountNotFoundError } from "../domain/errors/accountNotFound.error";
import { AccountHasNotActiveSubscriptionError } from "../domain/errors/accountHasNotActiveSubscription.error";
import { ClientId } from "../domain/valueObjects/ClientId";
import { ClientNotFoundError } from "../domain/errors/clientNotFound.error";
import { ClientHasNotActiveSubscriptionError } from "../domain/errors/clientHasNotActiveSubscription.error";
export class AddAddonToClientUsecase {
    constructor(accountRepository) {
        this.accountRepository = accountRepository;
    }
    addAddonToClient(accountId, clientId, addonId, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("INFOOOOOO");
            console.log(accountId, clientId, addonId, quantity);
            const account = yield this.accountRepository.getById(new AccountId(accountId));
            if (!account) {
                throw new AccountNotFoundError(accountId);
            }
            if (!account.hasActiveSubscription()) {
                throw new AccountHasNotActiveSubscriptionError(accountId);
            }
            const client = account.findClient(new ClientId(clientId));
            if (!client) {
                throw new ClientNotFoundError(clientId);
            }
            if (!client.hasActiveSubscription()) {
                throw new ClientHasNotActiveSubscriptionError(accountId);
            }
            yield this.accountRepository.rechargeClientAddon(new ClientId(clientId), addonId, quantity);
        });
    }
}
