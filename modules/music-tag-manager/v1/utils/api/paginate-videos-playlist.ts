import type { VideoPublicDTO } from "../../database/dto";
import type { ApiQueryParamsVideoPlaylist, RestApiResponseListCommon, TypeormPagination } from "../../types";

type Props = {
  shuffling: boolean;
  pagination: TypeormPagination;
};

export const paginateVideosPlaylist$ = async (payload: Props) => {
  const { limit, page } = payload.pagination;
  const { data, pagination } = await $fetch<RestApiResponseListCommon<VideoPublicDTO>>("/api/music-tag-manager/v1/videos/playlist", {
    method: "GET",
    query: {
      shuffling: "" + payload.shuffling,
      limit: limit || 100,
      page: page || 1,
    } satisfies ApiQueryParamsVideoPlaylist,
  });

  return { data, pagination };
};
