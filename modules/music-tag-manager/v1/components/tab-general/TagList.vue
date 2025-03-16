<template>
  <div class="grid grid-cols-[auto_1fr] grid-rows-1 gap-10 overflow-hidden">
    <div class="grid min-w-80 grid-rows-[auto_1fr] gap-4">
      <p>Tag categories:</p>
      <TabTagCategoryList :selected-tags="selectedTags" :display-selected-amount="false" list-key="tab_detail_generate_playlist_selected_tag_categories" display-key="tab_detail_generate_playlist_selected_tag_categories" :callback="onDisplayTags$" />
    </div>
    <div class="grid min-w-70 grid-rows-[auto_1fr] gap-5.5 overflow-hidden">
      <p>Tags:</p>
      <div class="relative grid">
        <TabTagList :tags="tags" :selected-tag-set="selectedTagSet" :callback="onDisplayTagDetail" />
        <Blur :visible="loading" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import type { TagPublicDTO } from "../../database/dto";
import { useStoreList, useStoreTabDetail, useStoreTheme } from "../../stores";
import { Blur } from "../shared";
import { TabTagCategoryList, TabTagList } from "../tab";

const stores = {
  list: useStoreList(),
  tabDetail: useStoreTabDetail(),
  theme: useStoreTheme(),
};

const loading = computed(() => stores.list.state.loading);
const selectedTagSet = computed(() => new Set(stores.list.state.lists.tab_detail_generate_playlist_selected_tags.map((tag) => tag.uuid)));
const selectedTags = computed(() => stores.list.state.lists.tab_detail_generate_playlist_selected_tags);
const tags = computed(() => stores.list.state.lists.tags);

const onDisplayTags$ = async ({ tagCategory }: { tagCategory: string }) => {
  stores.list.action.displaySelectedTags$({ tagCategory });
};

const onDisplayTagDetail = (payload: TagPublicDTO) => {};
</script>

<style></style>
