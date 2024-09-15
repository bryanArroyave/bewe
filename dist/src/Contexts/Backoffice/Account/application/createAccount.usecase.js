var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { AccountDuplicatedError } from "../domain/errors/accountDuplicated.error";
import { Account } from "../domain/Account";
import { AccountName } from "../domain/valueObjects/AccountName";
import { AccountType } from "../domain/valueObjects/AccountType";
export class CreateAccountUsecase {
    constructor(accountRepository) {
        this.accountRepository = accountRepository;
    }
    createAccount(accountDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const account = new Account(null, new AccountName(accountDto.name), new AccountType(accountDto.type, AccountType.ACCOUNT_TYPES), false);
            try {
                const id = yield this.accountRepository.save(account);
                return id;
            }
            catch (err) {
                if (err.message.includes("duplicate key value violates unique constraint")) {
                    throw new AccountDuplicatedError();
                }
                throw err;
            }
        });
    }
}
