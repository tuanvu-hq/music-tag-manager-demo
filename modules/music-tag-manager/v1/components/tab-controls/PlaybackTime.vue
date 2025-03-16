<template>
  <div class="font-roboto-mono-variable flex items-center gap-3 tabular-nums">
    <p>{{ currentTime }}</p>
    <div class="h-1.5 w-1.5 rounded-full" :class="[CONSTANTS_TW_DARK_MODE.bg[5]]"></div>
    <p>{{ endTime }}</p>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { CONSTANTS_TW_DARK_MODE } from "~/constants";
import { useStorePlayer } from "../../stores";
import { formatTime } from "../../utils/youtube-api";

const stores = {
  player: useStorePlayer(),
};

const currentTime = computed(() => formatTime({ seconds: stores.player.state.time.current }));
const endTime = computed(() => formatTime({ seconds: stores.player.state.time.end }));
</script>

<style></style>
