import { StringValueObject } from "../../../../Shared/domain/value-object/StringValueObject";
import { InvalidEmailError } from "../errors/invalidEmail.error";

export class ClientEmail extends StringValueObject {
  constructor(value: string) {
    super(value);

    this.validateIfEmailIsValid(value);
  }

  private validateIfEmailIsValid(email: string): void {
    const emailPattern = new RegExp(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    );
    if (!emailPattern.test(email)) {
      throw new InvalidEmailError();
    }
  }
}
