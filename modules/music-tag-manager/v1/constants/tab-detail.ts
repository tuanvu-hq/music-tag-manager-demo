import type { TabDetail } from "../types";

type Breadcrumbs = {
  [key in TabDetail]: string[];
};

export const CONSTANTS_TAB_DETAIL = {
  controls_generate_playlist: "controls_generate_playlist",
} as const;

export const CONSTANTS_TAB_DETAIL_BREADCRUMB: Breadcrumbs = {
  controls_generate_playlist: ["Playlist", "Generate playlist"],
} as const;
