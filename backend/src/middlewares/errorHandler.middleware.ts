import { AxiosError } from "axios";
import { CustomError } from "../errors";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

import { Logger } from "../utils";

export const errorHandlerMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  Logger.error(JSON.stringify(error));

  if (error instanceof CustomError) {
    res.status(error.errorCode).json({
      message: error.message,
    });
  }

  if (error instanceof AxiosError && error.response) {
    return res.status(error.response.status).json({
      message: error.response.statusText,
    });
  }

  res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    message: (error as Error).message,
  });
};
