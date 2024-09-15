var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ClientEmail } from "../domain/valueObjects/ClientEmail";
import { ClientName } from "../domain/valueObjects/ClientName";
import { Client } from "../domain/Client";
import { AccountId } from "../domain/valueObjects/AccountId";
import { AccountNotFoundError } from "../domain/errors/accountNotFound.error";
import { AccountHasNotActiveSubscriptionError } from "../domain/errors/accountHasNotActiveSubscription.error";
import { ClientDuplicatedError } from "../domain/errors/clientDuplicated.error";
export class AddClientUsecase {
    constructor(accountRepository) {
        this.accountRepository = accountRepository;
    }
    addClient(_accountId, accountData) {
        return __awaiter(this, void 0, void 0, function* () {
            const accountId = new AccountId(_accountId);
            const account = yield this.accountRepository.getById(accountId);
            if (!account) {
                throw new AccountNotFoundError(_accountId);
            }
            if (!account.hasActiveSubscription()) {
                throw new AccountHasNotActiveSubscriptionError(_accountId);
            }
            const client = new Client(null, new ClientName(accountData.name), new ClientEmail(accountData.email), false);
            try {
                yield account.addClient(accountId, client, this.accountRepository);
            }
            catch (err) {
                if (err.message.includes("duplicate key value violates unique constraint")) {
                    throw new ClientDuplicatedError();
                }
                throw err;
            }
        });
    }
}
