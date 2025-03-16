<template>
  <div class="flex items-center gap-1">
    <button class="h-10 w-10 cursor-pointer duration-300" :class="[themeValue.text.hover]">
      <SkipPrevious />
    </button>
    <PlaybackControlsPlay />
    <button class="h-10 w-10 cursor-pointer duration-300" :class="[themeValue.text.hover]">
      <SkipNext />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { SkipNext, SkipPrevious } from "~/components/icons";
import { PlaybackControlsPlay } from ".";
import { useStoreTheme } from "../../stores";

const stores = {
  theme: useStoreTheme(),
};

const themeValue = computed(() => stores.theme.state.themeValue);
</script>

<style></style>
