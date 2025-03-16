import { defineStore } from "pinia";
import { ref } from "vue";
import { CONSTANTS_TAB_DETAIL, CONSTANTS_TAB_DETAIL_BREADCRUMB } from "../constants/tab-detail";
import type { TabDetail } from "../types";

export const useStoreTabDetail = defineStore("[Music Tag Manager V1] Tab Detail", () => {
  const tabDetail = ref<TabDetail>(CONSTANTS_TAB_DETAIL.controls_generate_playlist);
  const breadcrumb = ref<string[]>([...CONSTANTS_TAB_DETAIL_BREADCRUMB.controls_generate_playlist]);
  const visible = ref(false);

  const state = {
    breadcrumb,
    tabDetail,
    visible,
  };

  const get = {};

  const set = {
    breadcrumb: (payload: TabDetail) => (breadcrumb.value = [...CONSTANTS_TAB_DETAIL_BREADCRUMB[payload]]),
    tabDetail: (payload: TabDetail) => setTabDetail(payload),
    visible: (payload: boolean) => (visible.value = payload),
  };

  const action = {};

  const setTabDetail = (payload: TabDetail) => {
    tabDetail.value = payload;
    breadcrumb.value = [...CONSTANTS_TAB_DETAIL_BREADCRUMB[payload]];
  };

  return { state, get, set, action };
});
