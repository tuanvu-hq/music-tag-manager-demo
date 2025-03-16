<template>
  <section class="relative grid">
    <Blur :visible="loading" />
    <div class="relative">
      <div v-if="videos.length > 0" v-bind="containerProps" class="absolute top-0 right-0 bottom-0 left-0 overflow-y-scroll duration-300">
        <div v-bind="wrapperProps">
          <VideoListItem :key="item.data.id" v-for="item in list" :item="item" :max="videos.length" />
        </div>
      </div>
      <div v-else>
        <p>Video list is empty.</p>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { useVirtualList } from "@vueuse/core";
import { computed, onMounted } from "vue";
import { useStoreList, useStorePagination } from "../../stores";
import { Blur } from "../shared";
import VideoListItem from "./VideoListItem.vue";

const stores = {
  list: useStoreList(),
  pagination: useStorePagination(),
};

const loading = computed(() => stores.pagination.state.loading);
const videos = computed(() => stores.list.state.lists.tab_general_videos);

const { list, containerProps, wrapperProps, scrollTo } = useVirtualList(videos, {
  itemHeight: 80,
  overscan: 10,
});

onMounted(() => {
  stores.list.set.scrollTo({ scrollToKey: "tab_general_videos", scrollTo });
});
</script>

<style></style>
