import { defineStore } from "pinia";
import { ref } from "vue";
import type { Tab } from "~/types/root";

export const useStoreRoot = defineStore("[Global] Root", () => {
  const tab = ref<Tab>("Routes");

  const state = {
    tab,
  };

  const get = {};

  const set = {
    tab: (payload: Tab) => {
      tab.value = payload;
    },
  };

  const action = {};

  return { state, get, set, action };
});
