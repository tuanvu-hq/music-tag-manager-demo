import { createError, defineEventHandler, getQuery } from "#imports";
import { ChannelPublicDTO } from "~/modules/music-tag-manager/v1/database/dto";
import { ChannelRepository } from "~/modules/music-tag-manager/v1/database/repository";
import { ApiQueryParamsChannel, RestApiResponseListCommon } from "~/modules/music-tag-manager/v1/types";
import { PropsPinoOptions } from "~/types/logger";
import { pinoLogger, pinoLoggerOptions } from "~/utils/logger";

export default defineEventHandler(async (event) => {
  const query = getQuery<ApiQueryParamsChannel>(event);
  const limit = query.limit || 0;
  const page = query.page || 0;

  const repository = new ChannelRepository();

  const loggerOptions: PropsPinoOptions = {
    title: "GET_CHANNELS",
    description: "Fetching channels.",
    origin: "[server/api/music-tag-manager/v1/channels/index.get.ts]",
  };
  const logger = pinoLogger();

  let count = 0;
  let channels: ChannelPublicDTO[] = [];

  try {
    const list = await repository.paginateItems$({
      limit: +limit,
      page: +page,
    });

    channels = list.result.map((channel) => ChannelPublicDTO.buildFrom(channel));
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
      current: channels.length,
    },
    data: channels,
  } satisfies RestApiResponseListCommon<ChannelPublicDTO>;
});
