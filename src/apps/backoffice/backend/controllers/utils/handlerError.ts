import { Response } from "express";
import { InvalidArgumentError } from "../../../../../Contexts/Shared/domain/value-object/InvalidArgumentError";
import httpStatus from "http-status";
import { NotFound as NotFoundError } from "../../../../../Contexts/Backoffice/Shared/errors/NotFound.error";
import { CustomError } from "../../../../../Contexts/Backoffice/Shared/errors/Custom.error";

export default function handlerError(error: Error | unknown, res: Response) {
  if (error instanceof InvalidArgumentError) {
    return res
      .status(httpStatus.UNPROCESSABLE_ENTITY)
      .send({ error: error.message });
  } else if (error instanceof NotFoundError) {
    return res.status(httpStatus.NOT_FOUND).send({ error: error.message });
  } else if (error instanceof CustomError) {
    return res.status(httpStatus.BAD_REQUEST).send({ error: error.message });
  }

  console.log("error handler", error);
  return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
    error: "internal server error",
    err: process.env.NODE_ENV === "production" ? undefined : error,
  });
}
