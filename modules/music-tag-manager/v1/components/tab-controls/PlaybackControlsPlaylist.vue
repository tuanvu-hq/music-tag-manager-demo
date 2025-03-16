<template>
  <div class="pointer-events-auto flex items-center gap-1">
    <div class="flex">
      <button class="h-10 w-10 cursor-pointer p-1.5 duration-300" :class="[themeValue.text.hover, { [themeValue.text.color]: shuffling }]" @click="onShuffle">
        <Shuffle />
      </button>
      <div class="w10 h-10"></div>
    </div>
    <PlaybackControlsSkip />
    <div class="flex">
      <button class="h-10 w-10 cursor-pointer p-1.5 duration-300" :class="[themeValue.text.hover, { [themeValue.text.color]: repeating }]" @click="onRepeat">
        <Repeat />
      </button>
      <button class="h-10 w-10 cursor-pointer p-1.5 duration-300" :class="[themeValue.text.hover, { [themeValue.text.color]: continuing }]" @click="onContinue">
        <ReplaceAudio />
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { Repeat, ReplaceAudio, Shuffle } from "~/components/icons";
import { PlaybackControlsSkip } from ".";
import { useStorePlayer, useStoreTheme } from "../../stores";

const stores = {
  player: useStorePlayer(),
  theme: useStoreTheme(),
};

const continuing = computed(() => stores.player.state.playback.continuing);
const repeating = computed(() => stores.player.state.playback.repeating);
const shuffling = computed(() => stores.player.state.playback.shuffling);
const themeValue = computed(() => stores.theme.state.themeValue);

const onShuffle = () => {
  stores.player.action.toggleShuffling();
};

const onRepeat = () => {
  stores.player.action.toggleRepeating();
};

const onContinue = () => {
  stores.player.action.toggleContinuing();
};
</script>

<style></style>
