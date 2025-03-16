import type { TagPublicDTO } from "../../database/dto";
import type { ApiQueryParamsTag, RestApiResponseListCommon, TypeormPagination } from "../../types";

type Props = {
  tagCategory: string;
  pagination: TypeormPagination;
};

export const paginateTags$ = async (payload: Props) => {
  const { limit, page } = payload.pagination;
  const { data, pagination } = await $fetch<RestApiResponseListCommon<TagPublicDTO>>("/api/music-tag-manager/v1/tag", {
    method: "GET",
    query: {
      tag_category: payload.tagCategory,
      limit: limit || 100,
      page: page || 1,
    } satisfies ApiQueryParamsTag,
  });

  return { data, pagination };
};
