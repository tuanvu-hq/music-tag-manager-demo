import { createError, defineEventHandler } from "#imports";
import { ThemeRepository } from "~/modules/music-tag-manager/v1/database/repository";
import { PropsPinoOptions } from "~/types/logger";
import { pinoLogger, pinoLoggerOptions } from "~/utils/logger";

export default defineEventHandler(async (event) => {
  const repository = new ThemeRepository();

  const loggerOptions: PropsPinoOptions = {
    title: "GET_THEME",
    description: "Fetching theme options.",
    origin: "[server/api/music-tag-manager/v1/theme/index.get.ts]",
  };
  const logger = pinoLogger();

  let theme;

  try {
    theme = await repository.getItem$();

    logger.info(pinoLoggerOptions({ ...loggerOptions }));
  } catch (error) {
    const err = error as Error;

    logger.error(pinoLoggerOptions({ ...loggerOptions, description: err.message }));
    logger.error({ err }, loggerOptions.title);

    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error",
      message: err.message,
    });
  }

  return theme;
});
