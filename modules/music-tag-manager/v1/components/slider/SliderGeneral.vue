<template>
  <div class="group absolute top-1/10 right-0 h-4/5 w-10 cursor-pointer overflow-hidden" :class="[{}]">
    <div class="h-full w-50 translate-x-10 rounded-[50%] opacity-0 duration-300 ease-[cubic-bezier(0.45,0.05,0.55,0.95)] group-hover:translate-x-0 group-hover:opacity-100" :class="[themeValue.bg.color]" @click="onClick"></div>
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
  stores.tab.set.tab(CONSTANTS_TAB.general);
  stores.tab.set.subtab(CONSTANTS_SUBTAB.channels);
  stores.tab.set.visible(true);
};
</script>

<style></style>
