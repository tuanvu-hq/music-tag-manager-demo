export const CONSTANTS_TW_DARK_MODE = {
  bg: {
    1: "bg-white text-neutral-950 dark:bg-neutral-950 dark:text-white",
    2: "bg-slate-100 dark:bg-neutral-900",
    2.5: "bg-slate-100 duration-300 hover:bg-slate-200 dark:bg-neutral-900 dark:hover:bg-neutral-800",
    3: "bg-slate-200 dark:bg-neutral-800",
    4: "bg-slate-300 dark:bg-neutral-700",
    5: "bg-slate-400 dark:bg-neutral-600",
  },
  text: {
    1: "text-neutral-950 dark:text-white",
    2: "text-neutral-800 dark:text-neutral-100",
    3: "text-neutral-700 dark:text-neutral-200",
    4: "text-neutral-600 dark:text-neutral-300",
    5: "text-neutral-500 dark:text-neutral-400",
    6: "text-neutral-600 dark:text-neutral-500",
  },
  border: {
    1: "border-slate-200 dark:border-neutral-800",
    2: "border-slate-300 dark:border-neutral-700",
    3: "border-slate-400 dark:border-neutral-600",
    4: "border-slate-500 dark:border-neutral-500",
  },
} as const;
