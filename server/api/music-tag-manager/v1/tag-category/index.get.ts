import { createError, defineEventHandler, getQuery } from "#imports";
import { TagCategoryPublicDTO } from "~/modules/music-tag-manager/v1/database/dto";
import { TagCategoryRepository } from "~/modules/music-tag-manager/v1/database/repository";
import { ApiQueryParamsVideo, RestApiResponseListCommon } from "~/modules/music-tag-manager/v1/types";
import { PropsPinoOptions } from "~/types/logger";
import { pinoLogger, pinoLoggerOptions } from "~/utils/logger";

export default defineEventHandler(async (event) => {
  const query = getQuery<ApiQueryParamsVideo>(event);

  const limit = query.limit || 0;
  const page = query.page || 0;

  const repository = new TagCategoryRepository();

  const loggerOptions: PropsPinoOptions = {
    title: "GET_TAG_CATEGORIES",
    description: "Fetching tag categories.",
    origin: "[server/api/music-tag-manager/v1/tag-category/index.get.ts]",
  };
  const logger = pinoLogger();

  let tagCategories: TagCategoryPublicDTO[] = [];
  let count = 0;

  try {
    const list = await repository.paginateItems$({
      limit: +limit,
      page: +page,
    });

    tagCategories = list.result.map((tagCategory) => TagCategoryPublicDTO.buildFrom(tagCategory));
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
      current: tagCategories.length,
    },
    data: tagCategories,
  } satisfies RestApiResponseListCommon<TagCategoryPublicDTO>;
});
