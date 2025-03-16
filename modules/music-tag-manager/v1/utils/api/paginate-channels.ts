import type { ChannelPublicDTO } from "../../database/dto";
import type { ApiQueryParamsChannel, RestApiResponseListCommon, TypeormPagination } from "../../types";

type Props = {
  pagination: TypeormPagination;
};

export const paginateChannels$ = async (payload: Props) => {
  const { limit, page } = payload.pagination;
  const { data, pagination } = await $fetch<RestApiResponseListCommon<ChannelPublicDTO>>("/api/music-tag-manager/v1/channels", {
    method: "GET",
    query: {
      limit: limit || 100,
      page: page || 1,
    } satisfies ApiQueryParamsChannel,
  });

  return { data, pagination };
};
