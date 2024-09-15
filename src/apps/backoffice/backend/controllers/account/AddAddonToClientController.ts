import { Request, Response } from "express";
import httpStatus from "http-status";
import { IController } from "../Controller";
import handlerError from "../utils/handlerError";
import { IAddAddonToClient } from "../../../../../Contexts/Backoffice/Account/application/ports/addAddonToClient.port";

export class AddAddonToClientController implements IController {
  constructor(private readonly usecase: IAddAddonToClient) {}

  async run(req: Request, res: Response): Promise<void> {
    const { accountId, clientId } = req.params;
    const { quantity, addon_id: addonId } = req.body;

    try {
      await this.usecase.addAddonToClient(
        parseInt(accountId),
        parseInt(clientId),
        parseInt(addonId),
        quantity
      );

      res.status(httpStatus.OK).send({ message: "success" });
    } catch (error: any) {
      handlerError(error, res);
    }
  }
}
