export const datasourceDatabase$ = async () => {
  await $fetch("/api/music-tag-manager/v1/configuration/postgres/create-database", { method: "GET" });
};
