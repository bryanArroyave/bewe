import { Request, Response } from "express";
import httpStatus from "http-status";
import { IController } from "../Controller";
import handlerError from "../utils/handlerError";
import { IUpdateClient } from "../../../../../Contexts/Backoffice/Account/application/ports/updateClient.port";
import AddClientDto from "../../../../../Contexts/Backoffice/Account/domain/dtos/addClient.dto";

export class UpdateClientController implements IController {
  constructor(private readonly usecase: IUpdateClient) {}

  async run(req: Request, res: Response): Promise<void> {
    const clientDto: AddClientDto = {
      name: req.body.name,
      email: req.body.email,
      cellphone: req.body.cellphone,
    };

    try {
      const accountId = await this.usecase.updateClient(
        parseInt(req.params.accountId),
        parseInt(req.params.clientId),
        clientDto
      );
      res.status(httpStatus.OK).send({ account_id: accountId });
    } catch (error: any) {
      handlerError(error, res);
    }
  }
}
