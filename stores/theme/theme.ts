import { useDark, useToggle } from "@vueuse/core";
import { defineStore } from "pinia";

export const useStoreTheme = defineStore("[Global] Theme", () => {
  const theme = useDark();
  const toggleTheme = useToggle(theme);

  const state = {
    theme,
  };

  const get = {};

  const set = {};

  const action = {
    toggleTheme: () => toggleTheme(),
  };

  return { state, get, set, action };
});
