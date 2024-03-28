import httpStatus from "http-status";

import { CustomError } from "./custom.error";

export class ConflicError extends CustomError {
  constructor(message: string, reasonCode?: string) {
    super(message, httpStatus.CONFLICT, reasonCode);
  }
}
