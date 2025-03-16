<template>
  <section class="grid grid-rows-[auto_1fr_auto] gap-6 overflow-hidden">
    <div class="flex h-12 items-center justify-between gap-2">
      <Searchbar placeholder="tags" :disabling="true" :callback="onSearchTags" />
      <div class="flex gap-2">
        <button class="group flex cursor-pointer gap-4 rounded border-2 px-4 py-2 duration-300" :class="[CONSTANTS_TW_DARK_MODE.bg[3], themeValue.border.hover, { [themeValue.border.color]: shuffling, [CONSTANTS_TW_DARK_MODE.border[1]]: !shuffling }]" @click="onToggleShuffling">Shuffle playlist</button>
        <button class="group flex cursor-pointer gap-4 rounded border-2 px-4 py-2 duration-300" :class="[CONSTANTS_TW_DARK_MODE.bg[3], themeValue.border.hover, { [themeValue.border.color]: exactMatch, [CONSTANTS_TW_DARK_MODE.border[1]]: !exactMatch }]" @click="onToggleExactMatch">Exact match</button>
        <button class="group flex cursor-pointer gap-4 rounded border-2 px-4 py-2 duration-300" :class="[CONSTANTS_TW_DARK_MODE.bg[3], themeValue.border.hover, { [themeValue.border.color]: displayingSelected, [CONSTANTS_TW_DARK_MODE.border[1]]: !displayingSelected }]" @click="onToggleSelectedTagCategories">
          <p>Selected</p>
          <p class="font-roboto-mono-variable rounded px-2 tabular-nums" :class="[CONSTANTS_TW_DARK_MODE.bg[4]]">
            {{ selectedTags.length }}
          </p>
        </button>
      </div>
    </div>
    <div class="grid grid-cols-[auto_1fr] grid-rows-1 gap-10 overflow-hidden">
      <div class="grid min-w-80 grid-rows-[auto_1fr] gap-4">
        <p>Tag categories:</p>
        <TabTagCategoryList :selected-tags="selectedTags" :display-selected-amount="true" list-key="tab_detail_generate_playlist_selected_tag_categories" display-key="tab_detail_generate_playlist_selected_tag_categories" :callback="onDisplayTags$" />
      </div>
      <div class="grid min-w-70 grid-rows-[auto_1fr] gap-5.5 overflow-hidden">
        <p>Tags:</p>
        <div class="relative grid">
          <TabTagList :tags="tags" :selected-tag-set="selectedTagSet" :callback="onSelectTag" />
          <Blur :visible="loading" />
        </div>
      </div>
    </div>
    <div class="flex justify-end">
      <ButtonGeneral :styling="[CONSTANTS_TW_DARK_MODE.bg[3], themeValue.bg.hover, 'hover:text-white']" :callback="onGeneratePlaylist" :disabling="selectedTags.length === 0">
        <p>Generate playlist</p>
      </ButtonGeneral>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { CONSTANTS_TW_DARK_MODE } from "~/constants";
import type { TagPublicDTO } from "../../database/dto";
import { useStoreList, useStorePlayer, useStoreTabDetail, useStoreTheme } from "../../stores";
import { Blur, ButtonGeneral, Searchbar } from "../shared";
import { TabTagCategoryList, TabTagList } from "../tab";

const stores = {
  list: useStoreList(),
  player: useStorePlayer(),
  tabDetail: useStoreTabDetail(),
  theme: useStoreTheme(),
};

const displayingSelected = computed(() => stores.list.state.displayings.tab_detail_generate_playlist_selected_tag_categories);
const exactMatch = computed(() => stores.list.state.exactMatch);
const loading = computed(() => stores.list.state.loading);
const selectedTagSet = computed(() => new Set(stores.list.state.lists.tab_detail_generate_playlist_selected_tags.map((tag) => tag.uuid)));
const selectedTags = computed(() => stores.list.state.lists.tab_detail_generate_playlist_selected_tags);
const shuffling = computed(() => stores.player.state.playback.shuffling);
const tags = computed(() => stores.list.state.lists.tags);
const themeValue = computed(() => stores.theme.state.themeValue);

const onDisplayTags$ = async ({ tagCategory }: { tagCategory: string }) => {
  stores.list.action.displaySelectedTags$({ tagCategory });
};

const onToggleShuffling = () => {
  stores.player.action.toggleShuffling();
};

const onToggleExactMatch = () => {
  stores.list.action.toggleExactMatch();
};

const onToggleSelectedTagCategories = () => {
  stores.list.action.toggleDisplaying({ displayKey: "tab_detail_generate_playlist_selected_tag_categories" });
};

const onGeneratePlaylist = async () => {
  stores.list.action.scrollTo({ scrollToKey: "tab_controls_playlist", index: 0 });
  stores.list.action.scrollTo({ scrollToKey: "tag_categories", index: 0 });
  stores.tabDetail.set.visible(false);
  await stores.list.action.generatePlaylist$();
};

const onSelectTag = (payload: TagPublicDTO) => {
  stores.list.action.toggleSelectedTags({ tag: payload });
};

const onSearchTags = () => {};
</script>

<style></style>
