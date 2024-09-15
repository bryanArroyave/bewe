import { Request, Response } from "express";
import httpStatus from "http-status";
import { IController } from "../Controller";
import { ICreateAccount } from "../../../../../Contexts/Backoffice/Account/application/ports/createAccount.port";
import CreateAccountDto from "../../../../../Contexts/Backoffice/Account/domain/dtos/createAccount.dto";
import handlerError from "../utils/handlerError";

export class CreateAccountController implements IController {
  constructor(private readonly usecase: ICreateAccount) {}

  async run(req: Request, res: Response): Promise<void> {
    const accountDto: CreateAccountDto = {
      name: req.body.name,
      type: req.body.type,
    };

    try {
      const accountId = await this.usecase.createAccount(accountDto);
      res.status(httpStatus.CREATED).send({ account_id: accountId });
    } catch (error: any) {
      handlerError(error, res);
    }
  }
}
