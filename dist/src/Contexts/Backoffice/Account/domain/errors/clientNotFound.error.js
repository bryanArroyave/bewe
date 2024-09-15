import { NotFound } from "../../../Shared/errors/NotFound.error";
export class ClientNotFoundError extends NotFound {
    constructor(id) {
        super(`Account has not client with id ${id}`);
    }
}
