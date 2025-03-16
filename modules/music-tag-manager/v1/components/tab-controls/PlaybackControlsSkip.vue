<template>
  <div class="flex items-center gap-1">
    <button class="h-10 w-10 cursor-pointer duration-300" :class="[themeValue.text.hover]" @click="onSkipPrevious$">
      <SkipPrevious />
    </button>
    <PlaybackControlsPlay />
    <button class="h-10 w-10 cursor-pointer duration-300" :class="[themeValue.text.hover]" @click="onSkipNext$">
      <SkipNext />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { SkipNext, SkipPrevious } from "~/components/icons";
import { PlaybackControlsPlay } from ".";
import { useStorePlayer, useStoreTheme } from "../../stores";

const stores = {
  player: useStorePlayer(),
  theme: useStoreTheme(),
};

const themeValue = computed(() => stores.theme.state.themeValue);

const onSkipPrevious$ = async () => {
  await stores.player.action.skipPrevious$();
};

const onSkipNext$ = async () => {
  await stores.player.action.skipNext$();
};
</script>

<style></style>
