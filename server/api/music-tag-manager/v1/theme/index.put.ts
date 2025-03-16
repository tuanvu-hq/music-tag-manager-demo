import { createError, defineEventHandler, readBody } from "#imports";
import { ThemeRepository } from "~/modules/music-tag-manager/v1/database/repository";
import { ApiBodyTheme, Color, Mode } from "~/modules/music-tag-manager/v1/types";
import { PropsPinoOptions } from "~/types/logger";
import { pinoLogger, pinoLoggerOptions } from "~/utils/logger";

export default defineEventHandler(async (event) => {
  const { color, mode } = await readBody<ApiBodyTheme>(event);

  const repository = new ThemeRepository();

  const MODULE = "[server/api/music-tag-manager/v1/theme/index.put.ts]";
  const HEADING = "UPDATE_THEME_COLOR";
  const DESCRIPTION = "Updating theme color was successfull.";

  const loggerOptions: PropsPinoOptions = {
    title: "UPDATE_THEME_COLOR",
    description: "Update theme color.",
    origin: "[server/api/music-tag-manager/v1/theme/index.put.ts]",
  };
  const logger = pinoLogger();

  try {
    await repository.updateItem$({ color: color as Color, mode: mode as Mode });

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

  return DESCRIPTION;
});
