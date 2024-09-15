import { Request, Response } from "express";
import httpStatus from "http-status";
import { IController } from "../Controller";
import { ICreateAddon } from "../../../../../Contexts/Backoffice/Addon/application/ports/createAddon.port";
import CreateAddonDto from "../../../../../Contexts/Backoffice/Addon/domain/dtos/createAddon.dto";
import handlerError from "../utils/handlerError";

export class CreateAddonController implements IController {
  constructor(private readonly usecase: ICreateAddon) {}

  async run(req: Request, res: Response): Promise<void> {
    const addonDto: CreateAddonDto = {
      name: req.body.name,
    };

    try {
      const addonId = await this.usecase.createAddon(addonDto);
      res.status(httpStatus.CREATED).send({ addon_id: addonId });
    } catch (error: any) {
      handlerError(error, res);
    }
  }
}
