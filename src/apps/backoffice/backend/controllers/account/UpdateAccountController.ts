import { Request, Response } from "express";
import httpStatus from "http-status";
import { IController } from "../Controller";
import { IUpdateAccount } from "../../../../../Contexts/Backoffice/Account/application/ports/updateAccount.port";
import UpdateAccountDto from "../../../../../Contexts/Backoffice/Account/domain/dtos/createAccount.dto";
import handlerError from "../utils/handlerError";

export class UpdateAccountController implements IController {
  constructor(private readonly usecase: IUpdateAccount) {}

  async run(req: Request, res: Response): Promise<void> {
    const accountDto: UpdateAccountDto = {
      name: req.body.name,
      type: req.body.type,
    };

    try {
      const accountId = await this.usecase.updateAccount(
        parseInt(req.params.accountId),
        accountDto
      );
      res.status(httpStatus.OK).send({ account_id: accountId });
    } catch (error: any) {
      handlerError(error, res);
    }
  }
}
