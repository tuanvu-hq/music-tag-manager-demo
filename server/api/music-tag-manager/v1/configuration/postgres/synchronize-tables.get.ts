import { defineEventHandler } from "#imports";
import { setupDB$ } from "~/modules/music-tag-manager/v1/database";
import { PropsPinoOptions } from "~/types/logger";
import { pinoLogger, pinoLoggerOptions } from "~/utils/logger";

export default defineEventHandler(async (event) => {
  const loggerOptions: PropsPinoOptions = {
    title: "SYNCHRONIZE_TABLES",
    description: "Synchronize talbes.",
    origin: "[server/api/music-tag-manager/v1/configuration/postgres/synchronize-tables.get.ts]",
  };
  const logger = pinoLogger();

  try {
    await setupDB$();

    logger.info(pinoLoggerOptions({ ...loggerOptions }));
  } catch (error) {
    const err = error as Error;

    logger.error(pinoLoggerOptions({ ...loggerOptions, description: err.message }));
    logger.error({ err }, loggerOptions.title);
  }

  return loggerOptions.description;
});
