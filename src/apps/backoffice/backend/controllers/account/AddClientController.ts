import { Request, Response } from "express";
import httpStatus from "http-status";
import { IController } from "../Controller";
import handlerError from "../utils/handlerError";
import { IAddClient } from "../../../../../Contexts/Backoffice/Account/application/ports/addClient.port";
import AddClientDto from "../../../../../Contexts/Backoffice/Account/domain/dtos/addClient.dto";

export class AddClientController implements IController {
  constructor(private readonly usecase: IAddClient) {}

  async run(req: Request, res: Response): Promise<void> {
    const accountId = req.params.accountId;

    const accountDto: AddClientDto = {
      name: req.body.name,
      email: req.body.email,
      cellphone: req.body.phone_number,
    };

    try {
      await this.usecase.addClient(parseInt(accountId), accountDto);

      res
        .status(httpStatus.CREATED)
        .send({ message: "client registered successfuly" });
    } catch (error: any) {
      handlerError(error, res);
    }
  }
}
