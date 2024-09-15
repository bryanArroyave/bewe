import { NotFound } from "../../../Shared/errors/NotFound.error";

export class AccountNotFoundError extends NotFound {
  constructor(accountId: number) {
    super(`Account '${accountId}' not found`);
  }
}
