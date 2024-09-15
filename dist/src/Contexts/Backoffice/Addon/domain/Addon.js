import { AggregateRoot } from "../../../Shared/domain/AggregateRoot";
import { AddonId } from "./valueObjects/AddonId";
import { AddonName } from "./valueObjects/AddonName";
export class Addon extends AggregateRoot {
    constructor(id, name) {
        super();
        if (id) {
            this.id = id;
        }
        this.name = name;
    }
    static create(id, name) {
        return new Addon(id, name);
    }
    static fromPrimitives(plainData) {
        return new Addon(plainData.id ? new AddonId(plainData.id) : null, new AddonName(plainData.name, AddonName.ADDON_NAMES));
    }
    toPrimitives() {
        var _a;
        return {
            id: (_a = this.id) === null || _a === void 0 ? void 0 : _a.value,
            name: this.name.value,
        };
    }
}
