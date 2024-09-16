import { Request, Response } from "express";
import httpStatus from "http-status";
import { IController } from "../Controller";
import handlerError from "../utils/handlerError";
import { IHandleAccountSubscription } from "../../../../../Contexts/Backoffice/Account/application/ports/handleAccountSubscription.port";

export class HandleAccountSubscriptionController implements IController {
  constructor(private readonly usecase: IHandleAccountSubscription) {}

  async run(req: Request, res: Response): Promise<void> {
    console.log(req.body);
    
    try {
      const accountId = await this.usecase.handleAccountSubscription(
        parseInt(req.params.accountId),
        req.body.status
      );
      res.status(httpStatus.OK).send({ account_id: accountId });
    } catch (error: any) {
      handlerError(error, res);
    }
  }
}
