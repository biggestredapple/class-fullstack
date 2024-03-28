import { NextFunction, Request, Response } from "express";

export const errorHandlerWrapper = (
  func: (req: Request, res: Response, next: NextFunction) => void
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await func(req, res, next);
    } catch (err: unknown) {
      next(err);
    }
  };
};
