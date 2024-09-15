import { EnumValueObject } from "../../../../Shared/domain/value-object/EnumValueObject";
import { AccountTypeNotFoundError } from "../errors/accountTypeNotFound.error";

export class AccountType extends EnumValueObject<string> {
  static readonly ACCOUNT_TYPES = ["wellness", "health"];

  protected throwErrorForInvalidValue(value: string): void {
    throw new AccountTypeNotFoundError(value);
  }
}
