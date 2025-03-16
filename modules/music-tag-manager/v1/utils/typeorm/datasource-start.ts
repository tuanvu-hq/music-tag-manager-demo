export const datasourceStart$ = async () => {
  await $fetch("/api/music-tag-manager/v1/configuration/postgres/start-ds", {
    method: "GET",
  });
};
