export const datasourceSynchronize$ = async () => {
  await $fetch("/api/music-tag-manager/v1/configuration/postgres/synchronize-tables", { method: "GET" });
};
