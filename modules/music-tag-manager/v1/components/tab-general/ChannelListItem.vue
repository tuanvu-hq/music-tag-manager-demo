<template>
  <div :key="item.index" class="group flex h-[80px] cursor-pointer items-center gap-4">
    <div>
      <p class="font-roboto-mono-variable tabular-nums" :class="[themeValue.text.hoverGroup, CONSTANTS_TW_DARK_MODE.text[4]]">
        {{ zeroPadDigit({ digit: item.index + 1 + step, max }) }}
      </p>
    </div>
    <div class="relative flex h-[45px] w-20 overflow-hidden rounded border-2 duration-300" :class="[CONSTANTS_TW_DARK_MODE.border[2], themeValue.border.hoverGroup]">
      <NuxtImg class="object-cover" :src="item.data.thumbnail.url" :width="item.data.thumbnail.width" :height="item.data.thumbnail.height" @error="onError" />
      <div
        class="absolute top-0 right-0 bottom-0 left-0"
        :class="[
          CONSTANTS_TW_DARK_MODE.bg[2],
          {
            'opacity-0': !error,
            'opacity-100': error,
          },
        ]"
      ></div>
    </div>
    <div>
      <p class="truncate text-lg duration-300" :class="[themeValue.text.hoverGroup]">
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
import type { ChannelPublicDTO } from "../../database/dto";
import { useStorePagination, useStoreTheme } from "../../stores";

defineProps<{
  item: UseVirtualListItem<ChannelPublicDTO>;
  max: number;
}>();

const stores = {
  pagination: useStorePagination(),
  theme: useStoreTheme(),
};

const error = ref(false);

const themeValue = computed(() => stores.theme.state.themeValue);
const step = computed(() => {
  const page = stores.pagination.state.paginations.tab_general_channels.pagination.page;
  const limit = stores.pagination.state.paginations.tab_general_channels.pagination.limit;

  return (page - 1) * limit;
});

const onError = () => {
  error.value = true;
};
</script>

<style></style>
