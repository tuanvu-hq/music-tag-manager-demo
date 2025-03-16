import type { SubtabControls, SubtabGeneral } from "../types";

export const CONSTANTS_TAB = {
  controls: "controls",
  general: "general",
} as const;

export const CONSTANTS_TAB_GENERAL = {
  channels: "channels",
  videos: "videos",
  tags: "tags",
  settings: "settings",
} as const;

export const CONSTANTS_TAB_GENERAL_LIST = Object.keys(CONSTANTS_TAB_GENERAL) as SubtabGeneral[];

export const CONSTANTS_TAB_CONTROLS = {
  playback: "playback",
  playlist: "playlist",
  tags: "tags",
} as const;

export const CONSTANTS_TAB_CONTROLS_LIST = Object.keys(CONSTANTS_TAB_CONTROLS) as SubtabControls[];

export const CONSTANTS_SUBTAB = {
  ...CONSTANTS_TAB_GENERAL,
  ...CONSTANTS_TAB_CONTROLS,
};
