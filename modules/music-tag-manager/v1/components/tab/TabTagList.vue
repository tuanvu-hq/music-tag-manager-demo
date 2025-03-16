<template>
  <div class="grid auto-rows-min grid-cols-4 gap-3 overflow-y-scroll pr-2">
    <button :key="item.uuid" v-for="item in tags" class="group flex h-10 cursor-pointer items-center justify-between rounded border-2 px-4 duration-300 hover:text-white" :class="[CONSTANTS_TW_DARK_MODE.bg[3], themeValue.bg.hover, { [themeValue.border.color]: selectedTagSet.has(item.uuid), 'border-transparent': !selectedTagSet.has(item.uuid) }]" @click="callback(item)">
      <p class="truncate duration-300 group-hover:text-white">{{ item.title }}</p>
    </button>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { CONSTANTS_TW_DARK_MODE } from "~/constants";
import type { TagPublicDTO } from "../../database/dto";
import { useStoreList, useStoreTheme } from "../../stores";

const props = defineProps<{
  tags: TagPublicDTO[];
  selectedTagSet: Set<string>;
  callback: (payload: TagPublicDTO) => void;
}>();

const stores = {
  list: useStoreList(),
  theme: useStoreTheme(),
};

const selectedTagSet = computed(() => props.selectedTagSet);
const tags = computed(() => props.tags);
const themeValue = computed(() => stores.theme.state.themeValue);
</script>

<style></style>
