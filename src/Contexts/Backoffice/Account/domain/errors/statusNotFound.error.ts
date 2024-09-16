import { NotFound } from "../../../Shared/errors/NotFound.error";
import { Status } from "../valueObjects/Status";

export class StatusNotFoundError extends NotFound {
  constructor(type: string) {
    super(
      `Status ${type} not allowed, please use one of the following: ${Status.TYPES.join(
        ", "
      )}`
    );
  }
}
