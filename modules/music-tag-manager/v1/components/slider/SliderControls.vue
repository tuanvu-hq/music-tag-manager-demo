<template>
  <div class="group absolute bottom-0 left-2/10 h-10 w-3/5 cursor-pointer overflow-hidden" :class="[{}]">
    <div class="h-40 w-full translate-y-10 rounded-[50%] opacity-0 duration-300 ease-[cubic-bezier(0.45,0.05,0.55,0.95)] group-hover:translate-y-0 group-hover:opacity-100" :class="[themeValue.bg.color]" @click="onClick"></div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { CONSTANTS_SUBTAB, CONSTANTS_TAB } from "../../constants";
import { useStoreTab, useStoreTheme } from "../../stores";

const stores = {
  tab: useStoreTab(),
  theme: useStoreTheme(),
};

const themeValue = computed(() => stores.theme.state.themeValue);

const onClick = () => {
  stores.tab.set.tab(CONSTANTS_TAB.controls);
  stores.tab.set.subtab(CONSTANTS_SUBTAB.playback);
  stores.tab.set.visible(true);
};
</script>

<style></style>
