import type { ApiBodyVideoPlaylist, BrandedUUID } from "../../types";

type Props = {
  tags: BrandedUUID[];
  exactMatch: boolean;
};

export const generatePlaylist$ = async ({ tags, exactMatch }: Props) => {
  await $fetch("/api/music-tag-manager/v1/videos/playlist", {
    method: "POST",
    body: {
      tags,
      exactMatch: "" + exactMatch,
    } satisfies ApiBodyVideoPlaylist,
  });
};
