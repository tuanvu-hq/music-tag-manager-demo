import { defineStore } from "pinia";
import { ref } from "vue";
import { DEFAULT_PAGINATION, DEFAULT_PROGRESS } from "../constants";
import type { ListKey, PaginateCallback, Pagination, PaginationKey, Paginations, Progress } from "../types";
import { useStoreList } from "./list";

type PropsActionPaginate = { paginationKey: PaginationKey; page: number; listKey: ListKey; callbackPaginate: PaginateCallback };
type PropsGetCalculateProgress = { pagination: Pagination; page?: number };
type PropsSetPagination = { paginationKey: PaginationKey; pagination: Pagination };
type PropsSleep = { ms?: number };

export const useStorePagination = defineStore("[Music Tag Manager V1] Pagination", () => {
  const stores = {
    list: useStoreList(),
  };

  const paginations = ref<Paginations>({
    tab_controls_generate_playlist: { pagination: { ...DEFAULT_PAGINATION }, progress: { ...DEFAULT_PROGRESS } },
    tab_controls_playlist: { pagination: { ...DEFAULT_PAGINATION }, progress: { ...DEFAULT_PROGRESS } },
    tab_controls_tags: { pagination: { ...DEFAULT_PAGINATION }, progress: { ...DEFAULT_PROGRESS } },
    tab_general_channels: { pagination: { ...DEFAULT_PAGINATION }, progress: { ...DEFAULT_PROGRESS } },
    tab_general_videos: { pagination: { ...DEFAULT_PAGINATION }, progress: { ...DEFAULT_PROGRESS } },
  });
  const loading = ref(false);

  const state = {
    loading,
    paginations,
  };

  const get = {
    calculatedProgress: (payload: PropsGetCalculateProgress) => getCalculateProgress(payload),
  };

  const set = {
    loading: (payload: boolean) => (loading.value = payload),
    pagination: (payload: PropsSetPagination) => setPagination(payload),
  };

  const action = {
    paginate$: async (payload: PropsActionPaginate) => await actionPaginate$(payload),
  };

  const getCalculateProgress = ({ pagination, page }: PropsGetCalculateProgress): Progress => {
    const total = pagination.total;
    const limit = pagination.limit;
    const min = 1;
    const max = total !== 0 ? Math.ceil(total / limit) : 1;
    const value = page || pagination.page || 1;
    const percentage = max > 1 ? (100 / max) * value : 100;

    return { min, max, value, percentage };
  };

  const setPagination = ({ paginationKey, pagination }: PropsSetPagination) => {
    paginations.value[paginationKey].pagination = pagination;
    paginations.value[paginationKey].progress = getCalculateProgress({ pagination });
  };

  const actionPaginate$ = async ({ paginationKey, page, listKey, callbackPaginate }: PropsActionPaginate) => {
    const START = Date.now();

    loading.value = true;

    await sleep$({ ms: 300 });

    const { data, pagination } = await callbackPaginate({ page });

    paginations.value[paginationKey].pagination.page = page;
    paginations.value[paginationKey].progress = getCalculateProgress({ pagination, page });
    stores.list.set.list({ listKey, data });

    const END = Date.now();
    const DIFF = END - START;

    setTimeout(
      () => {
        loading.value = false;
      },
      Math.max(0, 500 - DIFF),
    );
  };

  const sleep$ = async ({ ms = 1000 }: PropsSleep) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  return { state, get, set, action };
});
