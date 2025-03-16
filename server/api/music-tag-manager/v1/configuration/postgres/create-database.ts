import { defineEventHandler } from "#imports";
import { AppDataSourceType, createDB$ } from "~/modules/music-tag-manager/v1/database";
import { PropsPinoOptions } from "~/types/logger";
import { pinoLogger, pinoLoggerOptions } from "~/utils/logger";

export default defineEventHandler(async (event) => {
  const loggerOptions: PropsPinoOptions = {
    title: "CREATE_DATABASE",
    description: "Create database, if not available.",
    origin: "[server/api/music-tag-manager/v1/configuration/postgres/create-database.get.ts]",
  };
  const logger = pinoLogger();

  try {
    if (AppDataSourceType === "postgres") await createDB$();

    logger.info(pinoLoggerOptions({ ...loggerOptions }));
  } catch (error) {
    const err = error as Error;

    logger.error(pinoLoggerOptions({ ...loggerOptions, description: err.message }));
    logger.error({ err }, loggerOptions.title);
  }

  return loggerOptions.description;
});
