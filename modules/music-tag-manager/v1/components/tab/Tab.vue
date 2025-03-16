<template>
  <section
    class="absolute inset-0 grid h-screen w-full grid-cols-1 grid-rows-[auto_1fr] gap-5 overflow-hidden p-10 duration-300"
    :class="[
      CONSTANTS_TW_DARK_MODE.bg[1],
      {
        'pointer-events-none opacity-0': !visible,
        'pointer-events-auto opacity-100': visible,
      },
    ]"
  >
    <div class="flex items-center justify-between">
      <div class="text-4xl">
        <p v-if="tab === CONSTANTS_TAB.controls" class="h-fit">Controls</p>
        <p v-if="tab === CONSTANTS_TAB.general" class="h-fit">General</p>
      </div>
      <button class="h-14 w-14 cursor-pointer rounded-full duration-300" :class="[themeValue.text.hover]" @click="onClose">
        <CloseCircle />
      </button>
    </div>
    <div class="relative grid overflow-hidden">
      <TabControls v-if="tab === CONSTANTS_TAB.controls" />
      <TabGeneral v-if="tab === CONSTANTS_TAB.general" />
      <TabDetail />
    </div>
  </section>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { CloseCircle } from "~/components/icons";
import { CONSTANTS_TW_DARK_MODE } from "~/constants/tailwind";
import { TabControls, TabDetail, TabGeneral } from ".";
import { CONSTANTS_TAB } from "../../constants";
import { useStoreList, useStoreTab, useStoreTabDetail, useStoreTheme } from "../../stores";

const stores = {
  list: useStoreList(),
  tab: useStoreTab(),
  tabDetail: useStoreTabDetail(),
  theme: useStoreTheme(),
};

const tab = computed(() => stores.tab.state.tab);
const themeValue = computed(() => stores.theme.state.themeValue);
const visible = computed(() => stores.tab.state.visible);

const onClose = () => {
  stores.tab.set.visible(false);
  stores.list.set.list({ listKey: "tags", data: [] });

  setTimeout(() => {
    stores.tabDetail.set.visible(false);
  }, 300);
};
</script>

<style></style>
