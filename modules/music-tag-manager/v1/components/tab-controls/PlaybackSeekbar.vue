<template>
  <div class="relative h-2 overflow-hidden rounded bg-slate-200 dark:bg-neutral-800">
    <div class="pointer-events-none absolute inset-0 w-full opacity-100 duration-300" :class="[themeValue.bg.color]" :style="[{ width: `${progress}%` }]"></div>
    <input ref="inputRef" class="pointer-events-auto absolute inset-0 cursor-pointer opacity-0 disabled:cursor-default" type="range" :step="1 / end" :min="0" :max="end" :style="dynamicStyle" @change="onChange" />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { useStorePlayer, useStoreTheme } from "../../stores";

const inputRef = ref<HTMLInputElement>();

const stores = {
  player: useStorePlayer(),
  theme: useStoreTheme(),
};

const end = computed(() => stores.player.state.time.end);
const progress = computed(() => stores.player.state.time.progress * 100);
const themeValue = computed(() => stores.theme.state.themeValue);

const dynamicStyle = computed(() => ({
  "--bg-dynamic": themeValue.value.color,
}));

const onChange = async (event: Event) => {
  const value = +(event.target as HTMLInputElement).value;

  stores.player.action.seekTo(value);
};
</script>

<style scoped>
* {
  --bg-light: var(--color-slate-200);
  --bg-dark: var(--color-neutral-800);
  --height: 0.5rem;
}

input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  width: 100%;
  height: var(--height);
  overflow: hidden;
}

input[type="range"]::-webkit-slider-runnable-track {
  background: var(--bg-light);
  height: var(--height);
}

html.dark input[type="range"]::-webkit-slider-runnable-track {
  background: var(--bg-dark);
  height: var(--height);
}

input[type="range"]::-moz-range-track {
  background: var(--bg-light);
  height: var(--height);
}

html.dark input[type="range"]::-moz-range-track {
  background: var(--bg-dark);
  height: var(--height);
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  background-color: var(--bg-dynamic);
  margin-left: 0;
  height: var(--height);
  width: 0;
  box-shadow: -400px 0 0 400px var(--bg-dynamic);
}

input[type="range"]::-moz-range-thumb {
  background-color: var(--bg-dynamic);
  height: var(--height);
  width: 0;
  box-shadow: -400px 0 0 400px var(--bg-dynamic);
  border: none;
}

input[type="range"]::-moz-focus-outer {
  border: 0;
}
</style>
