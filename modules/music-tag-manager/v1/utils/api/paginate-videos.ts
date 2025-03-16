import type { VideoPublicDTO } from "../../database/dto";
import type { ApiQueryParamsVideo, RestApiResponseListCommon, TypeormPagination } from "../../types";

type Props = {
  pagination: TypeormPagination;
};

export const paginateVideos$ = async (payload: Props) => {
  const { limit, page } = payload.pagination;
  const { data, pagination } = await $fetch<RestApiResponseListCommon<VideoPublicDTO>>("/api/music-tag-manager/v1/videos", {
    method: "GET",
    query: {
      limit: limit || 100,
      page: page || 1,
    } satisfies ApiQueryParamsVideo,
  });

  return { data, pagination };
};
