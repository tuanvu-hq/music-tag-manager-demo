import { useDark, useToggle } from "@vueuse/core";
import { defineStore } from "pinia";
import { ref } from "vue";
import { CONSTANTS_TW_COLOR_LIST, CONSTANTS_TW_COLOR_PALETTE } from "../constants";
import { type ApiBodyTheme, type Color, type Mode } from "../types";

export const useStoreTheme = defineStore("[Music Tag Manager V1] Theme", () => {
  const theme = ref<Color>(CONSTANTS_TW_COLOR_LIST[0]);
  const themeValue = ref(CONSTANTS_TW_COLOR_PALETTE[theme.value]);
  const mode = useDark();
  const toggleTheme = useToggle(theme);

  const state = {
    theme,
    themeValue,
    mode,
  };

  const get = {};

  const set = {
    mode$: async (payload: Mode) => await setMode$(payload),
    theme$: async (payload: Color) => await setTheme$(payload),
  };

  const action = {
    toggleMode: () => toggleTheme(),
  };

  const setMode$ = async (payload: Mode) => {
    mode.value = payload === "light" ? false : true;

    await $fetch("/api/music-tag-manager/v1/theme", {
      method: "PUT",
      body: {
        mode: payload,
      } satisfies ApiBodyTheme,
    });
  };

  const setTheme$ = async (payload: Color) => {
    theme.value = payload;
    themeValue.value = CONSTANTS_TW_COLOR_PALETTE[payload];

    await $fetch("/api/music-tag-manager/v1/theme", {
      method: "PUT",
      body: {
        color: payload,
      } satisfies ApiBodyTheme,
    });
  };

  return { state, get, set, action };
});
