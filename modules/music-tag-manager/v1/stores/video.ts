import { defineStore } from "pinia";
import { ref } from "vue";
import type { VideoPublicDTO } from "../database/dto";

export const useStoreVideo = defineStore("[Music Tag Manager V1] Video", () => {
  const video = ref<VideoPublicDTO | null>(null);
  const index = ref<number>(-1);

  const state = {
    video,
    index,
  };

  const get = {};

  const set = {
    index: (payload: number) => (index.value = payload),
    video: (payload: VideoPublicDTO | null) => (video.value = payload),
  };

  const action = {};

  return { state, get, set, action };
});
