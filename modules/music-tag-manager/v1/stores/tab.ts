import { defineStore } from "pinia";
import { ref } from "vue";
import { CONSTANTS_SUBTAB, CONSTANTS_TAB } from "../constants";
import type { Subtab, Tab } from "../types";

export const useStoreTab = defineStore("[Music Tag Manager V1] Tab", () => {
  const tab = ref<Tab>(CONSTANTS_TAB.general);
  const subtab = ref<Subtab>(CONSTANTS_SUBTAB.channels);

  const loading = ref(false);
  const visible = ref(false);

  const state = {
    tab,
    subtab,
    loading,
    visible,
  };

  const get = {};

  const set = {
    loading: (payload: boolean) => (loading.value = payload),
    subtab: (payload: Subtab) => (subtab.value = payload),
    tab: (payload: Tab) => (tab.value = payload),
    visible: (payload: boolean) => (visible.value = payload),
  };

  const action = {
    resetState: () => actionResetState(),
  };

  const actionResetState = () => {
    tab.value = CONSTANTS_TAB.general;
    subtab.value = CONSTANTS_SUBTAB.channels;
  };

  return { state, get, set, action };
});
