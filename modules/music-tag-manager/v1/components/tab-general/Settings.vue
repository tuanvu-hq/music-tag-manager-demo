<template>
  <section class="space-y-10 overflow-y-scroll">
    <div class="space-y-4">
      <h2 class="text-lg font-bold">Theme</h2>
      <div class="flex gap-2">
        <ButtonGeneral :key="button.name" v-for="button of buttons" :styling="[themeValue.bg.hover, 'w-30 border-2 hover:text-white', button.mode === mode ? themeValue.border.color : 'border-transparent']" @click="button.callback">
          <p>{{ button.name }}</p>
        </ButtonGeneral>
      </div>
    </div>
    <div class="space-y-4">
      <h2 class="text-lg font-bold">Color Theme</h2>
      <div class="grid max-w-1/2 grid-cols-4 gap-2">
        <button :key="color" v-for="color of CONSTANTS_TW_COLOR_LIST" class="cursor-pointer rounded py-2 text-white duration-300 hover:opacity-100" :class="[CONSTANTS_TW_COLOR_PALETTE[color].bg.color, { 'opacity-50': theme !== color }]" @click="onSetColorTheme(color)">
          {{ capitalize(color) }}
        </button>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { capitalize } from "lodash";
import { computed } from "vue";
import { CONSTANTS_TW_COLOR_LIST, CONSTANTS_TW_COLOR_PALETTE } from "../../constants";
import { useStoreTheme } from "../../stores";
import type { Color } from "../../types";
import { ButtonGeneral } from "../shared";

const stores = {
  theme: useStoreTheme(),
};

const mode = computed(() => stores.theme.state.mode);
const theme = computed(() => stores.theme.state.theme);
const themeValue = computed(() => stores.theme.state.themeValue);

const onSetColorTheme = async (payload: Color) => {
  await stores.theme.set.theme$(payload);
};

const buttons = [
  {
    name: "Light",
    mode: false,
    callback: async () => await stores.theme.set.mode$("light"),
  },
  {
    name: "Dark",
    mode: true,
    callback: async () => await stores.theme.set.mode$("dark"),
  },
];
</script>

<style></style>
