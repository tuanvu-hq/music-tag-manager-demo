import type { CONSTANTS_DARK_MODE_LIST, CONSTANTS_TW_COLOR_LIST } from "../constants";

export type Color = (typeof CONSTANTS_TW_COLOR_LIST)[number];

export type Mode = (typeof CONSTANTS_DARK_MODE_LIST)[number];

type Base = {
  color: string;
  hover: string;
  hoverGroup: string;
};

type Oklch = `oklch(${string})`;

export type TwColorOklch = {
  [key in Color]: Oklch;
};

export type TwColorPalette = {
  [k in Color]: {
    color: Oklch;
    bg: Base;
    text: Base;
    border: Base;
  };
};
