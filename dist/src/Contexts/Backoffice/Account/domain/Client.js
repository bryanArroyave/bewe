import { ClientEmail } from "./valueObjects/ClientEmail";
import { ClientId } from "./valueObjects/ClientId";
import { ClientName } from "./valueObjects/ClientName";
export class Client {
    constructor(id, name, email, active) {
        if (id) {
            this.id = id;
        }
        this.name = name;
        this.email = email;
        this.active = active;
    }
    static create(id, name, email, active) {
        return new Client(id, name, email, active);
    }
    static fromPrimitives(plainData) {
        return new Client(plainData.id ? new ClientId(plainData.id) : null, new ClientName(plainData.name), new ClientEmail(plainData.email), plainData.active);
    }
    toPrimitives() {
        var _a;
        return {
            id: (_a = this.id) === null || _a === void 0 ? void 0 : _a.value,
            name: this.name.value,
            email: this.email.value,
            active: this.active,
        };
    }
    hasActiveSubscription() {
        return this.active;
    }
}
