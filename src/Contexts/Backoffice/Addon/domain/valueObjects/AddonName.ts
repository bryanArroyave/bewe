import { EnumValueObject } from "../../../../Shared/domain/value-object/EnumValueObject";
import { AddonNameNotFoundError } from "../errors/addonNameNotFound.error";

export class AddonName extends EnumValueObject<string> {
  static readonly ADDON_NAMES = ["sms", "email", "whatsapp"];

  protected throwErrorForInvalidValue(value: string): void {
    throw new AddonNameNotFoundError(value);
  }
}
