import type { TagCategoryPublicDTO } from "../../database/dto";
import type { ApiQueryParamsTagCategory, RestApiResponseListCommon, TypeormPagination } from "../../types";

type Props = {
  pagination: TypeormPagination;
};

export const paginateTagCategories$ = async (payload: Props) => {
  const { limit, page } = payload.pagination;
  const { data, pagination } = await $fetch<RestApiResponseListCommon<TagCategoryPublicDTO>>("/api/music-tag-manager/v1/tag-category", {
    method: "GET",
    query: {
      limit: limit || 100,
      page: page || 1,
    } satisfies ApiQueryParamsTagCategory,
  });

  return { data, pagination };
};
