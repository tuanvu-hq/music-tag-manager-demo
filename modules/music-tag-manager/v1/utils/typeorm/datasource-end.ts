export const datasourceEnd$ = async () => {
  await $fetch("/api/music-tag-manager/v1/configuration/postgres/end-ds", {
    method: "GET",
  });
};
