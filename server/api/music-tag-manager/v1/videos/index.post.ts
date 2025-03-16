import { createError, defineEventHandler, readBody, setResponseStatus } from "#imports";
import { VideoTypeorm } from "~/modules/music-tag-manager/v1/database/models";
import { VideoRepository } from "~/modules/music-tag-manager/v1/database/repository";
import { ApiBodyVideo } from "~/modules/music-tag-manager/v1/types";
import { getBrandedID } from "~/modules/music-tag-manager/v1/utils/brand";
import { PropsPinoOptions } from "~/types/logger";
import { pinoLogger, pinoLoggerOptions } from "~/utils/logger";

export default defineEventHandler(async (event) => {
  const body = await readBody<ApiBodyVideo>(event);
  const yt_video = body.video;
  const { id } = yt_video;

  const repository = new VideoRepository();

  const MODULE = "[server/api/music-tag-manager/v1/videos/index.post.ts]";
  const HEADING = "VIDEO_CREATE";

  const loggerOptions: PropsPinoOptions = {
    title: "CREATE_VIDEO",
    description: "Create video.",
    origin: "[server/api/music-tag-manager/v1/videos/index.post.ts]",
  };
  const logger = pinoLogger();

  let video: VideoTypeorm = new VideoTypeorm();
  let title: string = "";

  try {
    const search = await repository.getItem$(getBrandedID({ id }));

    if (search) {
      title = search.title;
      video = search;
      loggerOptions.description = `Video [${title}] already exists.`;
    }

    if (!search) {
      const { description, localized } = yt_video.snippet;
      yt_video.snippet.description = description.replace(/\n/g, "[NL]");
      yt_video.snippet.localized.description = localized.description.replace(/\n/g, "[NL]");

      const transformed = new VideoTypeorm().buildFrom(yt_video);

      video = await repository.createItem$(transformed);
      title = video.title;
      loggerOptions.description = `Video [${title}] has been created.`;
    }

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

  setResponseStatus(event, 201, "Created");

  return video;
});
