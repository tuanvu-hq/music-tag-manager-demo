import { defineEventHandler } from "#imports";
import { endDS$ } from "~/modules/music-tag-manager/v1/database";
import { PropsPinoOptions } from "~/types/logger";
import { pinoLogger, pinoLoggerOptions } from "~/utils/logger";

export default defineEventHandler(async (event) => {
  const loggerOptions: PropsPinoOptions = {
    title: "END_DATASOURCE",
    description: "Close datasource.",
    origin: "[server/api/music-tag-manager/v1/configuration/postgres/end-ds.get.ts]",
  };
  const logger = pinoLogger();

  try {
    await endDS$();

    logger.info(pinoLoggerOptions({ ...loggerOptions }));
  } catch (error) {
    const err = error as Error;

    logger.error(pinoLoggerOptions({ ...loggerOptions, description: err.message }));
    logger.error({ err }, loggerOptions.title);
  }

  return loggerOptions.description;
});
