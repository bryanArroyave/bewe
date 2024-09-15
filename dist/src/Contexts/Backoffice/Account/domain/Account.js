var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { AggregateRoot } from "../../../Shared/domain/AggregateRoot";
import { AccountId } from "./valueObjects/AccountId";
import { AccountName } from "./valueObjects/AccountName";
import { AccountType } from "./valueObjects/AccountType";
import { Client } from "./Client";
export class Account extends AggregateRoot {
    constructor(id, name, type, active, clients) {
        super();
        if (id) {
            this.id = id;
        }
        this.name = name;
        this.type = type;
        this.active = active;
        this.clients = clients || [];
    }
    static create(id, name, type, active, clients) {
        return new Account(id, name, type, active, clients);
    }
    static fromPrimitives(plainData) {
        var _a;
        return new Account(plainData.id ? new AccountId(plainData.id) : null, new AccountName(plainData.name), new AccountType(plainData.type, AccountType.ACCOUNT_TYPES), plainData.active, (_a = plainData.clients) === null || _a === void 0 ? void 0 : _a.map((client) => Client.fromPrimitives(client)));
    }
    toPrimitives() {
        var _a;
        return {
            id: (_a = this.id) === null || _a === void 0 ? void 0 : _a.value,
            name: this.name.value,
            type: this.type.value,
            active: this.active,
            clients: this.clients,
        };
    }
    hasActiveSubscription() {
        return this.active;
    }
    addClient(accountId, client, accountRepository) {
        return __awaiter(this, void 0, void 0, function* () {
            yield accountRepository.addClient(accountId, client);
            this.clients.push(client);
        });
    }
    findClient(clientId) {
        return (this.clients.find((client) => { var _a; return ((_a = client.id) === null || _a === void 0 ? void 0 : _a.value) === clientId.value; }) || null);
    }
}
