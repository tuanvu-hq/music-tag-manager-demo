<template>
  <section
    class="grid grid-cols-1 gap-5"
    :class="[
      {
        'grid-rows-[auto_auto_1fr]': !ingore.includes(subtab),
        'grid-rows-[auto_1fr]': ingore.includes(subtab),
      },
    ]"
  >
    <div class="flex h-10 items-center justify-between">
      <TabSelection :list="CONSTANTS_TAB_CONTROLS_LIST" :callback="onSetSubtab" />
      <div class="grid h-10">
        <PlaylistActions v-if="subtab === CONSTANTS_TAB_CONTROLS.playlist" />
      </div>
    </div>
    <div class="flex h-12 items-center justify-between" v-if="!ingore.includes(subtab)">
      <div>
        <Searchbar v-if="subtab === CONSTANTS_TAB_CONTROLS.playlist" placeholder="playlist" :disabling="true" :callback="onSearchPlaylist" />
        <Searchbar v-if="subtab === CONSTANTS_TAB_CONTROLS.tags && video" placeholder="tags" :disabling="true" :callback="onSearchTags" />
      </div>
      <div>
        <Pagination v-if="subtab === CONSTANTS_TAB_CONTROLS.playlist" pagination-key="tab_controls_playlist" list-key="tab_controls_playlist" :callback-paginate="onPaginatePlaylist" />
      </div>
    </div>
    <div class="grid">
      <Playback v-if="subtab === CONSTANTS_TAB_CONTROLS.playback" />
      <Playlist v-if="subtab === CONSTANTS_TAB_CONTROLS.playlist" />
      <TagList v-if="subtab === CONSTANTS_TAB_CONTROLS.tags && video" />
    </div>
  </section>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { TabSelection } from ".";
import { CONSTANTS_TAB_CONTROLS, CONSTANTS_TAB_CONTROLS_LIST } from "../../constants";
import { useStoreList, useStorePagination, useStorePlayer, useStoreTab, useStoreVideo } from "../../stores";
import type { Subtab, SubtabControls } from "../../types";
import { paginateVideosPlaylist$ } from "../../utils/api";
import { Pagination, Searchbar } from "../shared";
import { Playback, Playlist, PlaylistActions, TagList } from "../tab-controls";

const stores = {
  list: useStoreList(),
  pagination: useStorePagination(),
  player: useStorePlayer(),
  tab: useStoreTab(),
  video: useStoreVideo(),
};

const shuffling = computed(() => stores.player.state.playback.shuffling);
const subtab = computed(() => stores.tab.state.subtab);
const video = computed(() => stores.video.state.video);

const onPaginatePlaylist = async ({ page }: { page: number }) => {
  stores.list.action.scrollTo({ scrollToKey: "tab_controls_playlist", index: 0 });

  return await paginateVideosPlaylist$({ shuffling: shuffling.value, pagination: { page } });
};

const onSetSubtab = (payload: SubtabControls) => {
  stores.tab.set.subtab(payload);
};

const onSearchPlaylist = () => {};

const onSearchTags = () => {};

const ingore: Subtab[] = [CONSTANTS_TAB_CONTROLS.playback];
</script>

<style></style>
