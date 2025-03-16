<template>
  <div :key="item.index" class="group flex h-[80px] cursor-pointer items-center gap-4" @click="onSetVideo({ video: item.data, index: item.index })">
    <div>
      <p class="font-roboto-mono-variable tabular-nums duration-300" :class="[, themeValue.text.hoverGroup, { [themeValue.text.color]: item.index === index, [CONSTANTS_TW_DARK_MODE.text[4]]: item.index !== index }]">
        {{ zeroPadDigit({ digit: item.index + 1 + step, max }) }}
      </p>
    </div>
    <div class="relative flex h-[45px] w-20 overflow-hidden rounded border-2 duration-300" :class="[, themeValue.border.hoverGroup, { [themeValue.border.color]: item.index === index, [CONSTANTS_TW_DARK_MODE.border[2]]: item.index !== index }]">
      <NuxtImg class="object-cover" :src="item.data.thumbnail.url" :width="item.data.thumbnail.width" :height="item.data.thumbnail.height" @error="onError" />
      <div class="absolute top-0 right-0 bottom-0 left-0" :class="[CONSTANTS_TW_DARK_MODE.bg[2], { 'opacity-0': !error, 'opacity-100': error }]"></div>
    </div>
    <div>
      <p class="truncate text-lg duration-300" :class="[themeValue.text.hoverGroup, { [themeValue.text.color]: item.index === index }]">
        {{ item.data.title }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { UseVirtualListItem } from "@vueuse/core";
import { computed, ref } from "vue";
import { CONSTANTS_TW_DARK_MODE } from "~/constants/tailwind";
import { zeroPadDigit } from "~/utils/format";
import type { VideoPublicDTO } from "../../database/dto";
import { useStoreList, useStorePagination, useStorePlayer, useStoreTab, useStoreTheme, useStoreVideo } from "../../stores";

defineProps<{
  item: UseVirtualListItem<VideoPublicDTO>;
  max: number;
}>();

const stores = {
  list: useStoreList(),
  pagination: useStorePagination(),
  player: useStorePlayer(),
  tab: useStoreTab(),
  theme: useStoreTheme(),
  video: useStoreVideo(),
};

const error = ref(false);

const index = computed(() => stores.video.state.index);
const themeValue = computed(() => stores.theme.state.themeValue);
const step = computed(() => {
  const page = stores.pagination.state.paginations.tab_controls_playlist.pagination.page;
  const limit = stores.pagination.state.paginations.tab_controls_playlist.pagination.limit;

  return (page - 1) * limit;
});

const onSetVideo = ({ video, index }: { video: VideoPublicDTO; index: number }) => {
  stores.list.set.list({ listKey: "tags", data: [] });
  stores.video.set.video(video);
  stores.video.set.index(index);
  stores.list.set.list({ listKey: "tab_controls_selected_tags", data: video.customTags });
  stores.player.action.cueVideo(video);
  stores.tab.set.visible(false);
};

const onError = () => {
  error.value = true;
};
</script>

<style></style>
