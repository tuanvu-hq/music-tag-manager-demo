import { createError, defineEventHandler, getQuery } from "#imports";
import { TagCategoryPublicDTO, TagPublicDTO } from "~/modules/music-tag-manager/v1/database/dto";
import { TagRepository } from "~/modules/music-tag-manager/v1/database/repository";
import { ApiQueryParamsTag, RestApiResponseListCommon } from "~/modules/music-tag-manager/v1/types";
import { getBrandedTitle } from "~/modules/music-tag-manager/v1/utils/brand";
import { PropsPinoOptions } from "~/types/logger";
import { pinoLogger, pinoLoggerOptions } from "~/utils/logger";

export default defineEventHandler(async (event) => {
  const query = getQuery<ApiQueryParamsTag>(event);
  const limit = query.limit || 0;
  const page = query.page || 0;
  const tagCategory = query.tag_category;

  const repository = new TagRepository();

  const MODULE = "[server/api/music-tag-manager/v1/tag/index.get.ts]";
  const HEADING = "TAG_GET_ALL";

  const loggerOptions: PropsPinoOptions = {
    title: "GET_TAGS",
    description: "Fetching tags.",
    origin: "[server/api/music-tag-manager/v1/tag/index.get.ts]",
  };
  const logger = pinoLogger();

  let tags: TagPublicDTO[] = [];
  let count = 0;

  try {
    const list = await repository.paginateItemsFilteredByTagCategory$({
      tagCategory: getBrandedTitle({ title: tagCategory }),
      pagination: {
        limit: +limit,
        page: +page,
      },
    });

    tags = list.result.map((tag) => TagPublicDTO.buildFrom(tag));
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
      current: tags.length,
    },
    data: tags,
  } satisfies RestApiResponseListCommon<TagCategoryPublicDTO>;
});
