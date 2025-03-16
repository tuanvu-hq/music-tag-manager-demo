<template>
  <section class="relative grid h-screen overflow-hidden">
    <Preloader />
    <Warning />
    <Welcome />
    <div id="youtube-player" class="pointer-events-none bg-black"></div>
    <SliderGeneral />
    <SliderControls />
    <Tab />
  </section>
</template>

<script lang="ts" setup>
import "reflect-metadata";

import { useHead } from "#imports";
import { onBeforeMount, onBeforeUnmount, onMounted, onUnmounted } from "vue";
import { displayScrollbar, hideScrollbar } from "~/utils/scrollbar";
import { useStoreList, useStorePagination, useStorePlayer, useStorePreloader, useStoreTab, useStoreTheme } from "../stores";
import { getTheme$, paginateChannels$, paginateTagCategories$, paginateVideos$ } from "../utils/api";
import { datasourceEnd$, datasourceStart$ } from "../utils/typeorm";
import { datasourceDatabase$ } from "../utils/typeorm/datasource-database";
import { datasourceSynchronize$ } from "../utils/typeorm/datasource-synchronize";
import { checkForIframeInstance$, injectIframeAPI, loadIframe } from "../utils/youtube-api";
import { Preloader, Warning, Welcome } from "./shared";
import { SliderControls, SliderGeneral } from "./slider";
import { Tab } from "./tab";

useHead({
  title: "Music Tag Manager V1",
});

const stores = {
  list: useStoreList(),
  pagination: useStorePagination(),
  player: useStorePlayer(),
  preloader: useStorePreloader(),
  tab: useStoreTab(),
  theme: useStoreTheme(),
};

const messageEventListener = () => stores.player.action.listenToMessageEvents();

onBeforeMount(async () => {
  hideScrollbar();
});

onMounted(async () => {
  await datasourceDatabase$();
  await datasourceStart$();
  await datasourceSynchronize$();

  {
    const theme = await getTheme$();

    await stores.theme.set.theme$(theme.color);
    await stores.theme.set.mode$(theme.mode);
  }

  injectIframeAPI();

  const err = await checkForIframeInstance$();

  if (err) {
  } else {
    loadIframe();

    {
      const { data, pagination } = await paginateChannels$({ pagination: { page: 1 } });

      stores.list.set.list({ listKey: "tab_general_channels", data });
      stores.pagination.set.pagination({ paginationKey: "tab_general_channels", pagination });
    }

    {
      const { data, pagination } = await paginateVideos$({ pagination: { page: 1 } });

      stores.list.set.list({ listKey: "tab_general_videos", data });
      stores.pagination.set.pagination({ paginationKey: "tab_general_videos", pagination });
    }

    {
      const { data } = await paginateTagCategories$({ pagination: { limit: 1000, page: 1 } });

      stores.list.set.list({ listKey: "tag_categories", data });
    }

    addEventListener("message", messageEventListener);
  }
});

onBeforeUnmount(async () => {
  displayScrollbar();

  await datasourceEnd$();
});

onUnmounted(async () => {
  stores.preloader.action.resetLoading();
  stores.tab.action.resetState();

  removeEventListener("message", messageEventListener);
});
</script>

<style></style>
