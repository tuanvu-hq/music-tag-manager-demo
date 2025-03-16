<template>
  <div class="flex items-center gap-2">
    <button class="h-6 w-6 cursor-pointer duration-300" :class="[themeValue.text.hover]" @click="onToggle">
      <VolumeUp v-if="value === 100" />
      <VolumeDown v-if="value < 100 && value > 0" />
      <VolumeOff v-if="value === 0" />
    </button>
    <div class="relative h-2 w-[200px] overflow-hidden rounded bg-neutral-600">
      <div class="pointer-events-none absolute inset-0 w-full opacity-100 duration-300" :class="[themeValue.bg.color]" :style="[{ width: `${value}%` }]"></div>
      <input ref="inputRef" class="pointer-events-auto absolute inset-0 cursor-pointer opacity-0 disabled:cursor-default" type="range" :step="1" :min="0" :max="100" :value="value" :style="dynamicStyle" @change="onChange" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { VolumeDown, VolumeOff, VolumeUp } from "~/components/icons";
import { useStorePlayer, useStoreTheme } from "../../stores";

const inputRef = ref<HTMLInputElement>();

const stores = {
  player: useStorePlayer(),
  theme: useStoreTheme(),
};

const themeValue = computed(() => stores.theme.state.themeValue);
const value = computed(() => stores.player.state.volume.current);

const dynamicStyle = computed(() => ({
  "--bg-dynamic": themeValue.value.color,
}));

const onChange = async (event: Event) => {
  const value = +(event.target as HTMLInputElement).value;

  stores.player.set.volume(value);
};

const onToggle = () => {
  stores.player.action.toggleVolume();
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
