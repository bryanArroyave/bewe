import { CustomError } from "../../../Shared/errors/Custom.error";

export class ClientDuplicatedError extends CustomError {
  constructor() {
    super(`Client duplicated`);
  }
}
