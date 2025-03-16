import type { ThemeTypeorm } from "../../database/models";

export const getTheme$ = async () => {
  return await $fetch<ThemeTypeorm>("/api/music-tag-manager/v1/theme", { method: "GET" });
};
