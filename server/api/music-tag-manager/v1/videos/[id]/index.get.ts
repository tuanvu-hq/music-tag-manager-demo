import { createError, defineEventHandler } from "#imports";
import { VideoTypeorm } from "~/modules/music-tag-manager/v1/database/models";
import { VideoRepository } from "~/modules/music-tag-manager/v1/database/repository";
import { getBrandedID } from "~/modules/music-tag-manager/v1/utils/brand";
import { PropsPinoOptions } from "~/types/logger";
import { pinoLogger, pinoLoggerOptions } from "~/utils/logger";

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;

  const repository = new VideoRepository();

  const loggerOptions: PropsPinoOptions = {
    title: "GET_VIDEO_BY_ID",
    description: "Get video by ID.",
    origin: "[server/api/music-tag-manager/v1/videos/[id]/index.get.ts]",
  };
  const logger = pinoLogger();

  let video: VideoTypeorm | null;

  if (!id) {
    loggerOptions.description = "Video ID was not provided.";

    logger.info(pinoLoggerOptions({ ...loggerOptions }));

    throw createError({
      statusCode: 400,
      statusMessage: "Invalid input",
      message: loggerOptions.description,
    });
  }

  try {
    video = await repository.getItem$(getBrandedID({ id }));

    if (!video) {
      loggerOptions.description = `Video with ID [${id}] does not exist.`;

      logger.info(pinoLoggerOptions({ ...loggerOptions }));

      throw createError({
        statusCode: 404,
        statusMessage: "Not found",
        message: loggerOptions.description,
      });
    }

    loggerOptions.description = `Video with ID [${id}] retrieval was successfull.`;

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

  return video;
});
