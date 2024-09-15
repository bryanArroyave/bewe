import { CustomError } from "../../../Shared/errors/Custom.error";

export class AccountDuplicatedError extends CustomError {
  constructor() {
    super(`Account duplicated`);
  }
}
