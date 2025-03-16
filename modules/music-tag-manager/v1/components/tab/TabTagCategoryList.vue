<template>
  <div class="relative">
    <div v-if="tagCategories.length > 0" v-bind="containerProps" class="absolute top-0 right-0 bottom-0 left-0 overflow-y-scroll pr-2 duration-300">
      <div v-bind="wrapperProps">
        <TabTagCategoryListItem :key="item.data.uuid" v-for="item in list" :item="item" :max="list.length" :selected-tags="selectedTags" :display-selected-amount="displaySelectedAmount" :callback="callback" />
      </div>
    </div>
    <div v-else>
      <p>Tag category list is empty.</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useVirtualList } from "@vueuse/core";
import { computed, onMounted } from "vue";
import { TabTagCategoryListItem } from ".";
import type { TagPublicDTO } from "../../database/dto";
import { useStoreList, useStoreTheme } from "../../stores";
import type { DisplayKey, ListKey } from "../../types";

const props = defineProps<{
  selectedTags: TagPublicDTO[];
  listKey?: ListKey;
  displayKey?: DisplayKey;
  displaySelectedAmount: boolean;
  callback: (payload: { tagCategory: string }) => void;
}>();
const { listKey, displayKey } = props;

const stores = {
  list: useStoreList(),
  theme: useStoreTheme(),
};

const categories = computed(() => (displayingSelected.value ? selectedTagCategories.value : tagCategories.value));
const displayingSelected = computed(() => (displayKey ? stores.list.state.displayings[displayKey] : false));
const selectedTagCategories = computed(() => (listKey ? stores.list.state.lists[listKey] : []));
const tagCategories = computed(() => stores.list.state.lists.tag_categories);

const { list, containerProps, wrapperProps, scrollTo } = useVirtualList(categories, {
  itemHeight: 50,
  overscan: 10,
});

onMounted(() => {
  stores.list.set.scrollTo({ scrollToKey: "tag_categories", scrollTo });
});
</script>

<style></style>
