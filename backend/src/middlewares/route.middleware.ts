import { Request, Response, NextFunction } from "express";

import { Logger } from "utils";

export const routeMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  Logger.group({
    title: "New Request",
    descriptions: [
      {
        description: "URL",
        info: `${req.protocol}://${req.hostname}:${process.env.PORT}${req.url}`,
      },
      {
        description: "PARAMS",
        info: req.params,
      },
      {
        description: "QUERY",
        info: req.query,
      },
      {
        description: "BODY",
        info: req.body,
      },
    ],
  });

  next();
};
