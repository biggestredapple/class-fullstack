import httpStatus from "http-status";

import { CustomError } from "./custom.error";

export class ServerError extends CustomError {
  constructor(message: string, reasonCode?: string) {
    super(message, httpStatus.INTERNAL_SERVER_ERROR, reasonCode);
  }
}
