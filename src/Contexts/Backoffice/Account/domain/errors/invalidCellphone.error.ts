import { CustomError } from "../../../Shared/errors/Custom.error";

export class InvalidCellphoneError extends CustomError {
  constructor() {
    super("Invalid cellphone");
  }
}
