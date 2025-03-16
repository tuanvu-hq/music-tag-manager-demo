<template>
  <section class="grid grid-cols-1 grid-rows-[1fr_auto_auto]">
    <div>
      <div class="space-y-6">
        <h1 class="text-5xl">{{ video?.title || "" }}</h1>
        <div class="flex items-center gap-2">
          <h2>{{ video?.channelTitle || "" }}</h2>
          <div class="h-1.5 w-1.5 rounded-full" :class="[CONSTANTS_TW_DARK_MODE.bg[5], { 'opacity-100': video?.channelTitle, 'opacity-0': !video?.channelTitle }]"></div>
          <h2 class="font-roboto-mono tabular-nums">{{ video ? isoToDate_D_M_Y({ iso: video.publishedAt }) : "" }}</h2>
        </div>
      </div>
    </div>
    <div class="relative flex h-20 items-end justify-between pb-5">
      <PlaybackControlsVolume />
      <PlaybackTime />
      <div class="pointer-events-none absolute top-0 right-0 bottom-0 left-0 flex justify-center">
        <PlaybackControlsPlaylist />
      </div>
    </div>
    <PlaybackSeekbar />
  </section>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { CONSTANTS_TW_DARK_MODE } from "~/constants";
import { isoToDate_D_M_Y } from "~/utils/format";
import { PlaybackControlsPlaylist, PlaybackControlsVolume, PlaybackSeekbar, PlaybackTime } from ".";
import { useStoreVideo } from "../../stores";

const stores = {
  video: useStoreVideo(),
};

const video = computed(() => stores.video.state.video);
</script>

<style></style>
