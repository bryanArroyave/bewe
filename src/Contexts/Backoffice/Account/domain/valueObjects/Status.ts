import { EnumValueObject } from "../../../../Shared/domain/value-object/EnumValueObject";
import { StatusNotFoundError } from "../errors/statusNotFound.error";

export class Status extends EnumValueObject<string> {
  static readonly TYPES = ["active", "inactive", "deleted"];

  constructor(value: string) {
    super(value, Status.TYPES);
  }

  protected throwErrorForInvalidValue(value: string): void {
    throw new StatusNotFoundError(value);
  }
}
