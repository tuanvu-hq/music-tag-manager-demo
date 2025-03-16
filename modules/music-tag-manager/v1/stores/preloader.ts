import { defineStore } from "pinia";
import { ref } from "vue";

export const useStorePreloader = defineStore("[Music Tag Manager V1] Preloader", () => {
  const loading = ref(true);

  const state = {
    loading,
  };

  const get = {};

  const set = {
    loading: (payload: boolean) => (loading.value = payload),
  };

  const action = {
    resetLoading: () => (loading.value = true),
  };

  return { state, get, set, action };
});
