<template>
  <section class="relative grid">
    <Blur :visible="loading" />
    <div class="relative">
      <div v-if="channels.length > 0" v-bind="containerProps" class="absolute top-0 right-0 bottom-0 left-0 overflow-y-scroll duration-300">
        <div v-bind="wrapperProps">
          <ChannelListItem :key="item.data.id" v-for="item in list" :item="item" :max="channels.length" />
        </div>
      </div>
      <div v-else>
        <p>Channel list is empty.</p>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { useVirtualList } from "@vueuse/core";
import { computed, onMounted } from "vue";
import { ChannelListItem } from ".";
import { useStoreList, useStorePagination } from "../../stores";
import { Blur } from "../shared";

const stores = {
  list: useStoreList(),
  pagination: useStorePagination(),
};

const channels = computed(() => stores.list.state.lists.tab_general_channels);
const loading = computed(() => stores.pagination.state.loading);

const { list, containerProps, wrapperProps, scrollTo } = useVirtualList(channels, {
  itemHeight: 80,
  overscan: 10,
});

onMounted(() => {
  stores.list.set.scrollTo({ scrollToKey: "tab_general_channels", scrollTo });
});
</script>

<style></style>
