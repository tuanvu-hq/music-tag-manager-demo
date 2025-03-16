<template>
  <button class="relative h-15 w-15 cursor-pointer duration-300 perspective-midrange transform-3d" :class="[{ 'rotate-y-180': playing, 'rotate-y-0': !playing }]" @click="onToggle">
    <div class="absolute top-0 right-0 bottom-0 left-0 duration-300 backface-hidden" :class="[CONSTANTS_TW_DARK_MODE.bg[1], themeValue.text.hover]">
      <PlayCircle />
    </div>
    <div class="absolute top-0 right-0 bottom-0 left-0 rotate-y-180 duration-300 backface-hidden" :class="[CONSTANTS_TW_DARK_MODE.bg[1], themeValue.text.hover]">
      <PauseCircle />
    </div>
  </button>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { PauseCircle, PlayCircle } from "~/components/icons";
import { CONSTANTS_TW_DARK_MODE } from "~/constants";
import { useStorePlayer, useStoreTheme } from "../../stores";

const stores = {
  player: useStorePlayer(),
  theme: useStoreTheme(),
};

const playing = computed(() => stores.player.state.playback.playing);
const themeValue = computed(() => stores.theme.state.themeValue);

const onToggle = () => {
  stores.player.action.togglePlaying();
};
</script>

<style></style>
