export const datasourceTheme$ = async () => {
  return await $fetch("/api/music-tag-manager/v1/configuration/postgres/set-theme", { method: "GET" });
};
