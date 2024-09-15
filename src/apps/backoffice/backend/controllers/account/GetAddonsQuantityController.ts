import { Request, Response } from "express";
import httpStatus from "http-status";
import { IController } from "../Controller";
import handlerError from "../utils/handlerError";
import { IGetAddonsQuantity } from "../../../../../Contexts/Backoffice/Account/application/ports/getAddonsQuantity.port";

export class GetAddonsQuantityController implements IController {
  constructor(private readonly usecase: IGetAddonsQuantity) {}

  async run(req: Request, res: Response): Promise<void> {
    try {
      const clientId = await this.usecase.getAddonsQuantity(
        parseInt(req.params.accountId),
        parseInt(req.params.clientId)
      );
      res.status(httpStatus.OK).send({ client_id: clientId });
    } catch (error: any) {
      handlerError(error, res);
    }
  }
}
