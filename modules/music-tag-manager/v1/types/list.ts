import type { CONSTANTS_LIST } from "../constants";

export type ListKey = keyof typeof CONSTANTS_LIST;

export type Lists = {
  [key in ListKey]: any[];
};

export type ScrollTo = (payload: number) => void;

export type ScrollToKey = keyof Pick<Record<ListKey, any>, "tab_general_channels" | "tab_general_videos" | "tab_controls_playlist" | "tag_categories">;

export type ScrollTos = {
  [key in ScrollToKey]: ScrollTo;
};

export type DisplayKey = keyof Pick<Record<ListKey, any>, "tab_detail_generate_playlist_selected_tag_categories">;

export type Displayings = {
  [key in DisplayKey]: boolean;
};
