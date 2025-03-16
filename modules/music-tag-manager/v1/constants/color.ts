import type { TwColorOklch, TwColorPalette } from "../types";

export const CONSTANTS_DARK_MODE = {
  light: "light",
  dark: "dark",
} as const;

export const CONSTANTS_DARK_MODE_LIST = ["light", "dark"] as const;

export const CONSTANTS_TW_COLOR_LIST = ["rose", "red", "orange", "amber", "yellow", "lime", "green", "emerald", "teal", "cyan", "sky", "blue", "indigo", "violet", "purple", "fuchsia", "pink"] as const;

export const CONSTANTS_TW_COLOR = {
  rose: "rose",
  red: "red",
  orange: "orange",
  amber: "amber",
  yellow: "yellow",
  lime: "lime",
  green: "green",
  emerald: "emerald",
  teal: "teal",
  cyan: "cyan",
  sky: "sky",
  blue: "blue",
  indigo: "indigo",
  violet: "violet",
  purple: "purple",
  fuchsia: "fuchsia",
  pink: "pink",
} as const;

export const CONSTANTS_TW_COLOR_OKLCH: TwColorOklch = {
  rose: "oklch(0.645 0.246 16.439)",
  red: "oklch(0.637 0.237 25.331)",
  orange: "oklch(0.705 0.213 47.604)",
  amber: "oklch(0.769 0.188 70.08)",
  yellow: "oklch(0.795 0.184 86.047)",
  lime: "oklch(0.768 0.233 130.85)",
  green: "oklch(0.723 0.219 149.579)",
  emerald: "oklch(0.696 0.17 162.48)",
  teal: "oklch(0.704 0.14 182.503)",
  cyan: "oklch(0.715 0.143 215.221)",
  sky: "oklch(0.685 0.169 237.323)",
  blue: "oklch(0.623 0.214 259.815)",
  indigo: "oklch(0.585 0.233 277.117)",
  violet: "oklch(0.606 0.25 292.717)",
  purple: "oklch(0.627 0.265 303.9)",
  fuchsia: "oklch(0.667 0.295 322.15)",
  pink: "oklch(0.656 0.241 354.308)",
};

export const CONSTANTS_TW_COLOR_PALETTE: TwColorPalette = {
  rose: {
    color: "oklch(0.645 0.246 16.439)",
    bg: {
      color: "bg-rose-500",
      hover: "hover:bg-rose-500",
      hoverGroup: "group-hover:bg-rose-500",
    },
    text: {
      color: "text-rose-500",
      hover: "hover:text-rose-500",
      hoverGroup: "group-hover:text-rose-500",
    },
    border: {
      color: "border-rose-500",
      hover: "hover:border-rose-500",
      hoverGroup: "group-hover:border-rose-500",
    },
  },
  red: {
    color: "oklch(0.637 0.237 25.331)",
    bg: {
      color: "bg-red-500",
      hover: "hover:bg-red-500",
      hoverGroup: "group-hover:bg-red-500",
    },
    text: {
      color: "text-red-500",
      hover: "hover:text-red-500",
      hoverGroup: "group-hover:text-red-500",
    },
    border: {
      color: "border-red-500",
      hover: "hover:border-red-500",
      hoverGroup: "group-hover:border-red-500",
    },
  },
  orange: {
    color: "oklch(0.705 0.213 47.604)",
    bg: {
      color: "bg-orange-500",
      hover: "hover:bg-orange-500",
      hoverGroup: "group-hover:bg-orange-500",
    },
    text: {
      color: "text-orange-500",
      hover: "hover:text-orange-500",
      hoverGroup: "group-hover:text-orange-500",
    },
    border: {
      color: "border-orange-500",
      hover: "hover:border-orange-500",
      hoverGroup: "group-hover:border-orange-500",
    },
  },
  amber: {
    color: "oklch(0.769 0.188 70.08)",
    bg: {
      color: "bg-amber-500",
      hover: "hover:bg-amber-500",
      hoverGroup: "group-hover:bg-amber-500",
    },
    text: {
      color: "text-amber-500",
      hover: "hover:text-amber-500",
      hoverGroup: "group-hover:text-amber-500",
    },
    border: {
      color: "border-amber-500",
      hover: "hover:border-amber-500",
      hoverGroup: "group-hover:border-amber-500",
    },
  },
  yellow: {
    color: "oklch(0.795 0.184 86.047)",
    bg: {
      color: "bg-yellow-500",
      hover: "hover:bg-yellow-500",
      hoverGroup: "group-hover:bg-yellow-500",
    },
    text: {
      color: "text-yellow-500",
      hover: "hover:text-yellow-500",
      hoverGroup: "group-hover:text-yellow-500",
    },
    border: {
      color: "border-yellow-500",
      hover: "hover:border-yellow-500",
      hoverGroup: "group-hover:border-yellow-500",
    },
  },
  lime: {
    color: "oklch(0.768 0.233 130.85)",
    bg: {
      color: "bg-lime-500",
      hover: "hover:bg-lime-500",
      hoverGroup: "group-hover:bg-lime-500",
    },
    text: {
      color: "text-lime-500",
      hover: "hover:text-lime-500",
      hoverGroup: "group-hover:text-lime-500",
    },
    border: {
      color: "border-lime-500",
      hover: "hover:border-lime-500",
      hoverGroup: "group-hover:border-lime-500",
    },
  },
  green: {
    color: "oklch(0.723 0.219 149.579)",
    bg: {
      color: "bg-green-500",
      hover: "hover:bg-green-500",
      hoverGroup: "group-hover:bg-green-500",
    },
    text: {
      color: "text-green-500",
      hover: "hover:text-green-500",
      hoverGroup: "group-hover:text-green-500",
    },
    border: {
      color: "border-green-500",
      hover: "hover:border-green-500",
      hoverGroup: "group-hover:border-green-500",
    },
  },
  emerald: {
    color: "oklch(0.696 0.17 162.48)",
    bg: {
      color: "bg-emerald-500",
      hover: "hover:bg-emerald-500",
      hoverGroup: "group-hover:bg-emerald-500",
    },
    text: {
      color: "text-emerald-500",
      hover: "hover:text-emerald-500",
      hoverGroup: "group-hover:text-emerald-500",
    },
    border: {
      color: "border-emerald-500",
      hover: "hover:border-emerald-500",
      hoverGroup: "group-hover:border-emerald-500",
    },
  },
  teal: {
    color: "oklch(0.704 0.14 182.503)",
    bg: {
      color: "bg-teal-500",
      hover: "hover:bg-teal-500",
      hoverGroup: "group-hover:bg-teal-500",
    },
    text: {
      color: "text-teal-500",
      hover: "hover:text-teal-500",
      hoverGroup: "group-hover:text-teal-500",
    },
    border: {
      color: "border-teal-500",
      hover: "hover:border-teal-500",
      hoverGroup: "group-hover:border-teal-500",
    },
  },
  cyan: {
    color: "oklch(0.715 0.143 215.221)",
    bg: {
      color: "bg-cyan-500",
      hover: "hover:bg-cyan-500",
      hoverGroup: "group-hover:bg-cyan-500",
    },
    text: {
      color: "text-cyan-500",
      hover: "hover:text-cyan-500",
      hoverGroup: "group-hover:text-cyan-500",
    },
    border: {
      color: "border-cyan-500",
      hover: "hover:border-cyan-500",
      hoverGroup: "group-hover:border-cyan-500",
    },
  },
  sky: {
    color: "oklch(0.685 0.169 237.323)",
    bg: {
      color: "bg-sky-500",
      hover: "hover:bg-sky-500",
      hoverGroup: "group-hover:bg-sky-500",
    },
    text: {
      color: "text-sky-500",
      hover: "hover:text-sky-500",
      hoverGroup: "group-hover:text-sky-500",
    },
    border: {
      color: "border-sky-500",
      hover: "hover:border-sky-500",
      hoverGroup: "group-hover:border-sky-500",
    },
  },
  blue: {
    color: "oklch(0.623 0.214 259.815)",
    bg: {
      color: "bg-blue-500",
      hover: "hover:bg-blue-500",
      hoverGroup: "group-hover:bg-blue-500",
    },
    text: {
      color: "text-blue-500",
      hover: "hover:text-blue-500",
      hoverGroup: "group-hover:text-blue-500",
    },
    border: {
      color: "border-blue-500",
      hover: "hover:border-blue-500",
      hoverGroup: "group-hover:border-blue-500",
    },
  },
  indigo: {
    color: "oklch(0.585 0.233 277.117)",
    bg: {
      color: "bg-indigo-500",
      hover: "hover:bg-indigo-500",
      hoverGroup: "group-hover:bg-indigo-500",
    },
    text: {
      color: "text-indigo-500",
      hover: "hover:text-indigo-500",
      hoverGroup: "group-hover:text-indigo-500",
    },
    border: {
      color: "border-indigo-500",
      hover: "hover:border-indigo-500",
      hoverGroup: "group-hover:border-indigo-500",
    },
  },
  violet: {
    color: "oklch(0.606 0.25 292.717)",
    bg: {
      color: "bg-violet-500",
      hover: "hover:bg-violet-500",
      hoverGroup: "group-hover:bg-violet-500",
    },
    text: {
      color: "text-violet-500",
      hover: "hover:text-violet-500",
      hoverGroup: "group-hover:text-violet-500",
    },
    border: {
      color: "border-violet-500",
      hover: "hover:border-violet-500",
      hoverGroup: "group-hover:border-violet-500",
    },
  },
  purple: {
    color: "oklch(0.627 0.265 303.9)",
    bg: {
      color: "bg-purple-500",
      hover: "hover:bg-purple-500",
      hoverGroup: "group-hover:bg-purple-500",
    },
    text: {
      color: "text-purple-500",
      hover: "hover:text-purple-500",
      hoverGroup: "group-hover:text-purple-500",
    },
    border: {
      color: "border-purple-500",
      hover: "hover:border-purple-500",
      hoverGroup: "group-hover:border-purple-500",
    },
  },
  fuchsia: {
    color: "oklch(0.667 0.295 322.15)",
    bg: {
      color: "bg-fuchsia-500",
      hover: "hover:bg-fuchsia-500",
      hoverGroup: "group-hover:bg-fuchsia-500",
    },
    text: {
      color: "text-fuchsia-500",
      hover: "hover:text-fuchsia-500",
      hoverGroup: "group-hover:text-fuchsia-500",
    },
    border: {
      color: "border-fuchsia-500",
      hover: "hover:border-fuchsia-500",
      hoverGroup: "group-hover:border-fuchsia-500",
    },
  },
  pink: {
    color: "oklch(0.656 0.241 354.308)",
    bg: {
      color: "bg-pink-500",
      hover: "hover:bg-pink-500",
      hoverGroup: "group-hover:bg-pink-500",
    },
    text: {
      color: "text-pink-500",
      hover: "hover:text-pink-500",
      hoverGroup: "group-hover:text-pink-500",
    },
    border: {
      color: "border-pink-500",
      hover: "hover:border-pink-500",
      hoverGroup: "group-hover:border-pink-500",
    },
  },
} as const;
