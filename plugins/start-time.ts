import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      startTime: Date.now(),
    },
  };
});
