<template>
  <div class="flex items-center gap-6">
    <div class="flex items-center gap-2">
      <p class="font-bold" :class="[themeValue.text.color]">{{ progress.value }}</p>
      <div class="h-2 w-2 rounded-full" :class="[CONSTANTS_TW_DARK_MODE.bg[3]]"></div>
      <p>1 - {{ progress.max }}</p>
    </div>
    <div class="flex items-center gap-2">
      <button class="h-5 w-5 cursor-pointer duration-300 disabled:cursor-default disabled:text-inherit" :class="[themeValue.text.hover]" :disabled="loading || progress.min === progress.value" @click="onPrevious">
        <ArrowLeft />
      </button>
      <div class="relative h-2 w-[200px] overflow-hidden rounded" :class="[CONSTANTS_TW_DARK_MODE.bg[3]]">
        <div class="pointer-events-none absolute inset-0 w-full opacity-100 duration-300" :class="[themeValue.bg.color]" :style="[{ width: `${progress.percentage}%` }]"></div>
        <input ref="inputRef" class="pointer-events-auto absolute inset-0 cursor-pointer opacity-0 disabled:cursor-default" type="range" :step="1" :min="progress.min" :max="progress.max" :value="progress.value" :style="dynamicStyle" :disabled="loading || (progress.min === progress.value && progress.max === progress.value)" @change="onChange" />
      </div>
      <button class="h-5 w-5 cursor-pointer duration-300 disabled:cursor-default disabled:text-inherit" :class="[themeValue.text.hover, { [CONSTANTS_TW_DARK_MODE.text[3]]: progress.max === progress.value }]" :disabled="loading || progress.max === progress.value" @click="onNext">
        <ArrowRight />
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { CONSTANTS_TW_DARK_MODE } from "~/constants";
import { useStorePagination, useStoreTab, useStoreTheme } from "../../stores";
import type { ListKey, PaginateCallback, PaginationKey } from "../../types";

const props = defineProps<{
  paginationKey: PaginationKey;
  listKey: ListKey;
  callbackPaginate: PaginateCallback;
}>();
const { paginationKey, listKey, callbackPaginate } = props;

const inputRef = ref<HTMLInputElement>();

const stores = {
  pagination: useStorePagination(),
  tab: useStoreTab(),
  theme: useStoreTheme(),
};

const loading = computed(() => stores.tab.state.loading);
const progress = computed(() => stores.pagination.state.paginations[paginationKey].progress);
const themeValue = computed(() => stores.theme.state.themeValue);

const dynamicStyle = computed(() => ({
  "--bg-dynamic": themeValue.value.color,
}));

const onPrevious = async () => {
  const page = progress.value.value - 1;

  if (loading.value) return;
  if (page < progress.value.min) return;

  await stores.pagination.action.paginate$({ paginationKey, page, listKey, callbackPaginate });
};

const onNext = async () => {
  const page = progress.value.value + 1;

  if (loading.value) return;
  if (page > progress.value.max) return;

  await stores.pagination.action.paginate$({ paginationKey, page, listKey, callbackPaginate });
};

const onChange = async (event: Event) => {
  const value = +(event.target as HTMLInputElement).value;

  if (value === 0) {
    const input = inputRef.value;

    if (input) {
      input.value = "" + 1;
    }

    return;
  }

  const page = value === 0 ? 1 : value;

  await stores.pagination.action.paginate$({ paginationKey, page, listKey, callbackPaginate });
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
