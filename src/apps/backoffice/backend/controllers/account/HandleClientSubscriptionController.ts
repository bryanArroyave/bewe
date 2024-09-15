import { Request, Response } from "express";
import httpStatus from "http-status";
import { IController } from "../Controller";
import handlerError from "../utils/handlerError";
import { IHandleClientSubscription } from "../../../../../Contexts/Backoffice/Account/application/ports/handleClientSubscription.port";

export class HandleClientSubscriptionController implements IController {
  constructor(private readonly usecase: IHandleClientSubscription) {}

  async run(req: Request, res: Response): Promise<void> {
    try {
      const clientId = await this.usecase.handleClientSubscription(
        parseInt(req.params.accountId),
        parseInt(req.params.clientId),
        req.body.active
      );
      res.status(httpStatus.OK).send({ client_id: clientId });
    } catch (error: any) {
      handlerError(error, res);
    }
  }
}
