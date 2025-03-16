import { createError, defineEventHandler, getQuery } from "#imports";
import { VideoPublicDTO } from "~/modules/music-tag-manager/v1/database/dto";
import { VideoTypeorm } from "~/modules/music-tag-manager/v1/database/models";
import { PlaylistRepository } from "~/modules/music-tag-manager/v1/database/repository";
import { ApiQueryParamsVideoPlaylist, RestApiResponseListCommon } from "~/modules/music-tag-manager/v1/types";
import { PropsPinoOptions } from "~/types/logger";
import { pinoLogger, pinoLoggerOptions } from "~/utils/logger";

export default defineEventHandler(async (event) => {
  const query = getQuery<ApiQueryParamsVideoPlaylist>(event);
  const limit = query.limit || 0;
  const page = query.page || 0;

  const repository = new PlaylistRepository();

  const loggerOptions: PropsPinoOptions = {
    title: "GET_PLAYLIST",
    description: "Fetching playlist.",
    origin: "[server/api/music-tag-manager/v1/videos/playlist/index.get.ts]",
  };
  const logger = pinoLogger();

  let videos: VideoPublicDTO[] = [];
  let count = 0;
  let list: { result: VideoTypeorm[]; count: number } = { result: [], count: 0 };
  let shuffling = false;

  try {
    if (query.shuffling === "true") shuffling = true;

    list = await repository.paginateItems$({
      shuffling,
      pagination: { limit: +limit, page: +page },
    });

    videos = list.result.map((video) => VideoPublicDTO.buildFrom(video));
    count = list.count;

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

  return {
    pagination: {
      limit: +limit,
      page: +page,
      total: count,
      current: videos.length,
    },
    data: videos,
  } satisfies RestApiResponseListCommon<VideoPublicDTO>;
});
