<template>
  <button
    class="min-w-20 cursor-pointer rounded px-4 py-2 duration-300 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400 disabled:hover:bg-slate-100 dark:disabled:bg-neutral-900 dark:disabled:text-neutral-600 dark:disabled:hover:bg-neutral-900"
    :class="[CONSTANTS_TW_DARK_MODE.bg[3], styling ? styling : []]"
    @click="() => (callback ? callback() : null)"
    :disabled="disabling"
  >
    <slot />
  </button>
</template>

<script lang="ts" setup>
import { CONSTANTS_TW_DARK_MODE } from "~/constants";

defineProps<{
  styling?: string[];
  disabling?: boolean;
  callback?: (payload?: any) => void;
}>();
</script>

<style></style>
