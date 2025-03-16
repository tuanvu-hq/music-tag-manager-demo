<template>
  <section class="grid">
    <PlaylistList />
  </section>
</template>

<script lang="ts" setup>
import { computed, onMounted } from "vue";
import { PlaylistList } from ".";
import { useStoreList, useStoreVideo } from "../../stores";

const stores = {
  list: useStoreList(),
  video: useStoreVideo(),
};

const index = computed(() => stores.video.state.index);

onMounted(() => {
  if (index.value >= 0) stores.list.action.scrollTo({ scrollToKey: "tab_controls_playlist", index: index.value });
});
</script>

<style></style>
