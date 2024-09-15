import { Request, Response } from "express";
import httpStatus from "http-status";
import { IController } from "../Controller";
import handlerError from "../utils/handlerError";
import { INotify } from "../../../../../Contexts/Backoffice/Account/application/ports/notify.port";

export class NotifyController implements IController {
  constructor(private readonly usecase: INotify) {}

  async run(req: Request, res: Response): Promise<void> {
    try {
      await this.usecase.notify(
        parseInt(req.params.accountId),
        parseInt(req.params.clientId),
        req.body.channel
      );
      res.status(httpStatus.OK).send({ message: "notification successfuly!" });
    } catch (error: any) {
      handlerError(error, res);
    }
  }
}
