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
      <TabSelection :list="CONSTANTS_TAB_GENERAL_LIST" :callback="onSetSubtab" />
      <div class="grid h-10">
        <ChannelActions v-if="subtab === CONSTANTS_TAB_GENERAL.channels" />
        <TagActions v-if="subtab === CONSTANTS_TAB_GENERAL.tags" />
      </div>
    </div>
    <div class="flex h-12 items-center justify-between" v-if="!ingore.includes(subtab)">
      <div>
        <Searchbar v-if="subtab === CONSTANTS_TAB_GENERAL.channels" placeholder="channels" :disabling="true" :callback="onSearchChannels" />
        <Searchbar v-if="subtab === CONSTANTS_TAB_GENERAL.videos" placeholder="videos" :disabling="true" :callback="onSearchVideos" />
        <Searchbar v-if="subtab === CONSTANTS_TAB_GENERAL.tags" placeholder="tags" :disabling="true" :callback="onSearchTags" />
      </div>
      <div>
        <Pagination v-if="subtab === CONSTANTS_TAB_GENERAL.channels" pagination-key="tab_general_channels" list-key="tab_general_channels" :callback-paginate="onPaginateChannels" />
        <Pagination v-if="subtab === CONSTANTS_TAB_GENERAL.videos" pagination-key="tab_general_videos" list-key="tab_general_videos" :callback-paginate="onPaginateVideos" />
      </div>
    </div>
    <div class="grid">
      <ChannelList v-if="subtab === CONSTANTS_TAB_GENERAL.channels" />
      <VideoList v-if="subtab === CONSTANTS_TAB_GENERAL.videos" />
      <TagList v-if="subtab === CONSTANTS_TAB_GENERAL.tags" />
      <Settings v-if="subtab === CONSTANTS_TAB_GENERAL.settings" />
    </div>
  </section>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { TabSelection } from ".";
import { CONSTANTS_TAB_GENERAL, CONSTANTS_TAB_GENERAL_LIST } from "../../constants";
import { useStoreList, useStorePagination, useStoreTab } from "../../stores";
import { type Subtab, type SubtabGeneral } from "../../types";
import { paginateChannels$, paginateVideos$ } from "../../utils/api";
import { Pagination, Searchbar } from "../shared";
import { ChannelActions, ChannelList, Settings, TagActions, TagList, VideoList } from "../tab-general";

const stores = {
  list: useStoreList(),
  pagination: useStorePagination(),
  tab: useStoreTab(),
};

const subtab = computed(() => stores.tab.state.subtab);

const onPaginateChannels = async ({ page }: { page: number }) => {
  stores.list.action.scrollTo({ scrollToKey: "tab_general_channels", index: 0 });

  return await paginateChannels$({ pagination: { page } });
};

const onPaginateVideos = async ({ page }: { page: number }) => {
  stores.list.action.scrollTo({ scrollToKey: "tab_general_videos", index: 0 });

  return await paginateVideos$({ pagination: { page } });
};

const onSetSubtab = (payload: SubtabGeneral) => {
  stores.tab.set.subtab(payload);
};

const onSearchChannels = () => {};

const onSearchVideos = () => {};

const onSearchTags = () => {};

const ingore: Subtab[] = [CONSTANTS_TAB_GENERAL.settings];
</script>

<style></style>
