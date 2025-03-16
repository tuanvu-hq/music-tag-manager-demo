import { createError, defineEventHandler, readBody } from "#imports";
import { PlaylistRepository } from "~/modules/music-tag-manager/v1/database/repository";
import { ApiBodyVideoPlaylist, BrandedUUID } from "~/modules/music-tag-manager/v1/types";
import { getBrandedUUID } from "~/modules/music-tag-manager/v1/utils/brand";
import { PropsPinoOptions } from "~/types/logger";
import { pinoLogger, pinoLoggerOptions } from "~/utils/logger";

export default defineEventHandler(async (event) => {
  const body = await readBody<ApiBodyVideoPlaylist>(event);

  const repository = new PlaylistRepository();

  const loggerOptions: PropsPinoOptions = {
    title: "GENERATE_PLAYLSIT",
    description: "Generate playlist.",
    origin: "[server/api/music-tag-manager/v1/videos/playlist/index.post.ts]",
  };
  const logger = pinoLogger();

  let tags: BrandedUUID[] = [];
  let exactMatch = false;

  try {
    if (typeof body.tags === "string") tags = [getBrandedUUID({ uuid: body.tags })];
    if (typeof body.tags === "object") tags = body.tags.map((tag) => getBrandedUUID({ uuid: tag }));
    if (body.exactMatch === "true") exactMatch = true;

    await repository.generateItems$({ tags, exactMatch });

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

  return loggerOptions.description;
});
