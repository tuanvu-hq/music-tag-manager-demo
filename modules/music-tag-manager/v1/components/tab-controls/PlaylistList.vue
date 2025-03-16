<template>
  <section class="relative grid">
    <Blur :visible="loading" />
    <div class="relative">
      <div v-if="playlist.length > 0" v-bind="containerProps" class="absolute top-0 right-0 bottom-0 left-0 overflow-y-scroll duration-300">
        <div v-bind="wrapperProps">
          <PlaylistListItem :key="item.data.id" v-for="item in list" :item="item" :max="playlist.length" />
        </div>
      </div>
      <div v-else>
        <p>Playlist is empty.</p>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { useVirtualList } from "@vueuse/core";
import { computed, onMounted } from "vue";
import { PlaylistListItem } from ".";
import { useStoreList, useStorePagination } from "../../stores";
import { Blur } from "../shared";

const stores = {
  list: useStoreList(),
  pagination: useStorePagination(),
};

const loading = computed(() => stores.pagination.state.loading);
const playlist = computed(() => stores.list.state.lists.tab_controls_playlist);

const { list, containerProps, wrapperProps, scrollTo } = useVirtualList(playlist, {
  itemHeight: 80,
  overscan: 10,
});

onMounted(() => {
  stores.list.set.scrollTo({ scrollToKey: "tab_controls_playlist", scrollTo });
});
</script>

<style></style>
