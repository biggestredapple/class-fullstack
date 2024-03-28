import { Logger } from "utils";
import { MESSAGES } from "consts";
import { AppDataSource } from "setup/database.setup";
import "dotenv/config";
const setupServer = async () => {
  try {
    await AppDataSource.initialize();
    Logger.info(MESSAGES.DATABASE.CONNECTION_SUCCESS);
  } catch (error: unknown) {
    Logger.info(MESSAGES.DATABASE.CONNECTION_FAILURE);
    Logger.error(error);

    process.exit(0);
  }
};

setupServer();