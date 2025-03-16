<template>
  <div class="flex h-[50px] items-center justify-center">
    <button class="group flex h-[40px] w-full cursor-pointer items-center gap-4 truncate rounded px-4 text-left duration-300 hover:text-white" :class="[CONSTANTS_TW_DARK_MODE.bg[3], themeValue.bg.hover]" @click="callback({ tagCategory: item.data.title })">
      <p v-if="displaySelectedAmount" class="font-roboto-mono-variable rounded px-2 tabular-nums" :class="[CONSTANTS_TW_DARK_MODE.bg[4], CONSTANTS_TW_DARK_MODE.text[1]]">
        {{ selectedTags.length }}
      </p>
      <p class="duration-300 group-hover:text-white">{{ item.data.title }}</p>
    </button>
  </div>
</template>

<script lang="ts" setup>
import { type UseVirtualListItem } from "@vueuse/core";
import { computed } from "vue";
import { CONSTANTS_TW_DARK_MODE } from "~/constants";
import type { TagCategoryPublicDTO, TagPublicDTO } from "../../database/dto";
import { useStoreList, useStoreTheme } from "../../stores";

const props = defineProps<{
  item: UseVirtualListItem<TagCategoryPublicDTO>;
  max: number;
  selectedTags: TagPublicDTO[];
  displaySelectedAmount: boolean;
  callback: (payload: { tagCategory: string }) => void;
}>();

const stores = {
  list: useStoreList(),
  theme: useStoreTheme(),
};

const selectedTags = computed(() => props.selectedTags.map((tag) => tag.tagCategory.uuid).filter((tag) => tag === props.item.data.uuid));
const themeValue = computed(() => stores.theme.state.themeValue);
</script>

<style></style>
