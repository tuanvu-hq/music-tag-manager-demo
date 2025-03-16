<template>
  <input class="h-10 w-70 rounded px-5 focus:outline-none disabled:cursor-not-allowed disabled:bg-slate-100 dark:disabled:bg-neutral-900" :class="[CONSTANTS_TW_DARK_MODE.bg[3], styling ? styling : []]" :disabled="disabling" :placeholder="`Search ${placeholder}`" type="text" @input="callback" />
</template>

<script lang="ts" setup>
import { CONSTANTS_TW_DARK_MODE } from "~/constants/tailwind";

defineProps<{
  placeholder: string;
  styling?: string[];
  disabling?: boolean;
  callback: (payload: any) => void;
}>();
</script>

<style></style>
