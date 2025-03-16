<template>
  <section class="absolute top-0 right-0 bottom-0 left-0 grid grid-rows-[auto_1fr] space-y-5 overflow-hidden duration-300" :class="[CONSTANTS_TW_DARK_MODE.bg[1], { 'pointer-events-none opacity-0': !visible, 'pointer-events-auto opacity-100': visible }]">
    <div class="flex items-center justify-between">
      <div class="flex h-10 gap-2">
        <div :key="item" v-for="item of breadcrumb" class="flex items-center gap-2">
          <p>{{ item }}</p>
          <p v-if="item !== last(breadcrumb)">></p>
        </div>
      </div>
      <ButtonGeneral :styling="[CONSTANTS_TW_DARK_MODE.bg[3], themeValue.bg.hover, 'hover:text-white']" @click="onClose"> Back </ButtonGeneral>
    </div>
    <div class="grid overflow-hidden">
      <GeneratePlaylist v-if="tabDetail === CONSTANTS_TAB_DETAIL.controls_generate_playlist" />
    </div>
  </section>
</template>

<script lang="ts" setup>
import { last } from "lodash";
import { computed } from "vue";
import { CONSTANTS_TW_DARK_MODE } from "~/constants";
import { CONSTANTS_TAB_DETAIL } from "../../constants";
import { useStoreTabDetail, useStoreTheme } from "../../stores";
import { ButtonGeneral } from "../shared";
import { GeneratePlaylist } from "../tab-detail-controls";

const stores = {
  tabDetail: useStoreTabDetail(),
  theme: useStoreTheme(),
};

const breadcrumb = computed(() => stores.tabDetail.state.breadcrumb);
const tabDetail = computed(() => stores.tabDetail.state.tabDetail);
const visible = computed(() => stores.tabDetail.state.visible);

const themeValue = computed(() => stores.theme.state.themeValue);

const onClose = () => {
  stores.tabDetail.set.visible(false);
};
</script>

<style></style>
