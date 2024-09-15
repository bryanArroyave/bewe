import { EnumValueObject } from "../../../../Shared/domain/value-object/EnumValueObject";
import { AddonNameNotFoundError } from "../errors/addonNameNotFound.error";
export class AddonName extends EnumValueObject {
    throwErrorForInvalidValue(value) {
        throw new AddonNameNotFoundError(value);
    }
}
AddonName.ADDON_NAMES = ["sms", "email", "whatsapp"];
