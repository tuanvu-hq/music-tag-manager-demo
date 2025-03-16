<template>
  <div class="flex gap-2">
    <ButtonGeneral :styling="[CONSTANTS_TW_DARK_MODE.bg[3], themeValue.bg.hover, 'hover:text-white']" @click="onOpenTabDetail(CONSTANTS_TAB_DETAIL.controls_generate_playlist)">
      <p>Generate playlist</p>
    </ButtonGeneral>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { CONSTANTS_TW_DARK_MODE } from "~/constants";
import { CONSTANTS_TAB_DETAIL } from "../../constants";
import { useStoreTabDetail, useStoreTheme } from "../../stores";
import type { TabDetail } from "../../types";
import { ButtonGeneral } from "../shared";

const stores = {
  tabDetail: useStoreTabDetail(),
  theme: useStoreTheme(),
};

const themeValue = computed(() => stores.theme.state.themeValue);

const onOpenTabDetail = (payload: TabDetail) => {
  stores.tabDetail.set.tabDetail(payload);
  stores.tabDetail.set.visible(true);
};
</script>

<style></style>
