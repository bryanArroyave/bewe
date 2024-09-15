var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { CustomError } from "../../../Shared/errors/Custom.error";
import { Account } from "../../domain/Account";
import { Account as AccountEntity } from "./account.entity";
import { Client as ClientEntity } from "./client.entity";
import { ClientAddon as ClientAddonEntity } from "./clientAddon.entity";
export class AccountRepository {
    addClient(accountId, clientData) {
        return __awaiter(this, void 0, void 0, function* () {
            const _client = new ClientEntity();
            _client.name = clientData.name.value;
            _client.email = clientData.email.value;
            _client.active = clientData.active;
            const _account = new AccountEntity();
            _account.id = accountId.value;
            _client.account = _account;
            yield _client.save();
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const _account = yield AccountEntity.findOne({
                where: { id: id.value },
                relations: ["clients"],
            });
            if (_account) {
                return Account.fromPrimitives({
                    id: _account.id,
                    name: _account.name,
                    type: _account.type,
                    active: _account.active,
                    clients: _account.clients,
                });
            }
            return null;
        });
    }
    save(account) {
        return __awaiter(this, void 0, void 0, function* () {
            const _account = new AccountEntity();
            _account.name = account.name.value;
            _account.type = account.type.value;
            _account.active = account.active;
            yield _account.save();
            return _account.id;
        });
    }
    rechargeClientAddon(clientId, addonId, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let _clientAddon = yield ClientAddonEntity.findOne({
                    where: { clientId: clientId.value, addonId: addonId },
                });
                console.log();
                if (_clientAddon) {
                    _clientAddon.quantity += quantity;
                    yield _clientAddon.save();
                    return;
                }
                _clientAddon = new ClientAddonEntity();
                _clientAddon.clientId = clientId.value;
                _clientAddon.addonId = addonId;
                _clientAddon.quantity = quantity;
            }
            catch (error) {
                console.log("----------------------------");
                console.log(error.message);
                if (error.message.includes('insert or update on table "client_addons" violates foreign key constraint')) {
                    throw new CustomError("Addon not found");
                }
            }
        });
    }
}
