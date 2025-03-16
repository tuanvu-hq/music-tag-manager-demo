import { useNuxtApp } from "#app";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useStorePreloader = defineStore("[Global] Preloader", () => {
  const appReady = ref(false);
  const loading = ref(true);
  const timeout = ref<NodeJS.Timeout | null>(null);

  const state = {
    appReady,
    loading,
  };

  const get = {};

  const set = {
    appReady: () => {
      appReady.value = true;
    },
    loading: (payload: boolean) => {
      loading.value = payload;
    },
  };

  const action = {
    seTimeout: () => {
      const startTime = useNuxtApp().$startTime;
      const endTime = Date.now();
      const timeTaken = endTime - startTime;
      const time = Math.max(0, 1500 - timeTaken);

      timeout.value = setTimeout(() => {
        if (appReady.value) {
          loading.value = false;
        }
      }, time);
    },
    clearTimeout: () => {
      if (timeout.value) {
        clearTimeout(timeout.value);
        timeout.value = null;
      }
    },
  };

  return { state, get, set, action };
});

/**
 * 1.
 *        APP: X-X-O-O-O-O-O
 *    TIMEOUT: X-X-X-X-O-O-O
 *
 * 2.
 *        APP: X-X-X-X-O-O-O
 *    TIMEOUT: X-X-X-X-O-O-O
 *
 * 3.
 *        APP: X-X-X-X-X-X-O
 *    TIMEOUT: X-X-X-X-O-O-O
 */
