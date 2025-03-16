<template>
  <div class="flex gap-2">
    <div :key="item" v-for="item of list" class="flex items-center gap-2">
      <button class="cursor-pointer duration-300" :class="[{ [themeValue.text.color]: subtab === item }]" @click="callback(item)">
        {{ capitalize(item) }}
      </button>
      <div v-if="!ignore.has(item)" class="h-2 w-2 rounded-full" :class="[CONSTANTS_TW_DARK_MODE.bg[3]]"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { capitalize, last } from "lodash";
import { computed } from "vue";
import { CONSTANTS_TW_DARK_MODE } from "~/constants/tailwind";
import { CONSTANTS_TAB_CONTROLS_LIST, CONSTANTS_TAB_GENERAL_LIST } from "../../constants";
import { useStoreTab, useStoreTheme } from "../../stores";
import { type SubtabControls, type SubtabGeneral } from "../../types";

defineProps<{
  list: SubtabControls[] | SubtabGeneral[];
  callback: (payload: any) => void;
}>();

const stores = {
  tab: useStoreTab(),
  theme: useStoreTheme(),
};

const subtab = computed(() => stores.tab.state.subtab);
const tab = computed(() => stores.tab.state.tab);
const themeValue = computed(() => stores.theme.state.themeValue);

const ignore = new Set([tab.value === "controls" ? last(CONSTANTS_TAB_CONTROLS_LIST) : last(CONSTANTS_TAB_GENERAL_LIST)]);
</script>

<style></style>
