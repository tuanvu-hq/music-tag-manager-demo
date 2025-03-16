<template>
  <section class="grid grid-rows-[1fr_auto] gap-6 overflow-hidden">
    <div class="grid grid-cols-[auto_1fr] grid-rows-1 gap-10 overflow-hidden">
      <div class="grid min-w-80 grid-rows-[auto_1fr] gap-4">
        <p>Tag categories:</p>
        <TabTagCategoryList :selected-tags="selectedTags" :display-selected-amount="true" list-key="tab_detail_generate_playlist_selected_tag_categories" display-key="tab_detail_generate_playlist_selected_tag_categories" :callback="onDisplayTags$" />
      </div>
      <div class="grid min-w-70 grid-rows-[auto_1fr] gap-5.5 overflow-hidden">
        <p>Tags:</p>
        <div class="relative grid">
          <TabTagList :tags="tags" :selected-tag-set="selectedTagSet" :callback="onDisplayTagDetail" />
          <Blur :visible="loading" />
        </div>
      </div>
    </div>
    <div class="flex justify-end">
      <ButtonGeneral :styling="[CONSTANTS_TW_DARK_MODE.bg[3], themeValue.bg.hover, 'hover:text-white']" :disabling="true" :callback="onUpdateTags">
        <p>Update</p>
      </ButtonGeneral>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { CONSTANTS_TW_DARK_MODE } from "~/constants";
import type { TagPublicDTO } from "../../database/dto";
import { useStoreList, useStoreTabDetail, useStoreTheme } from "../../stores";
import { Blur, ButtonGeneral } from "../shared";
import { TabTagCategoryList, TabTagList } from "../tab";

const stores = {
  list: useStoreList(),
  tabDetail: useStoreTabDetail(),
  theme: useStoreTheme(),
};

const loading = computed(() => stores.list.state.loading);
const selectedTagSet = computed(() => new Set(stores.list.state.lists.tab_controls_selected_tags.map((tag) => tag.uuid)));
const selectedTags = computed(() => stores.list.state.lists.tab_controls_selected_tags);
const tags = computed(() => stores.list.state.lists.tags);
const themeValue = computed(() => stores.theme.state.themeValue);

const onDisplayTags$ = async ({ tagCategory }: { tagCategory: string }) => {
  stores.list.action.displaySelectedTags$({ tagCategory });
};

const onDisplayTagDetail = (payload: TagPublicDTO) => {};

const onUpdateTags = () => {};
</script>

<style></style>
