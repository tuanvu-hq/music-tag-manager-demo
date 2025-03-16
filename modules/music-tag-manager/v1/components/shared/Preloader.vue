<template>
  <div class="absolute inset-0 z-50 flex h-full w-full flex-col items-center justify-center gap-5 duration-300" :class="[CONSTANTS_TW_DARK_MODE.bg[1], { 'pointer-events-none opacity-0': !loading, 'pointer-events-auto opacity-100': loading }]">
    <p class="text-3xl font-bold">LOADING</p>
    <p>( initial PGlite load might take a little while )</p>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { CONSTANTS_TW_DARK_MODE } from "~/constants/tailwind";
import { useStorePreloader } from "../../stores";

const stores = {
  preloader: useStorePreloader(),
};

const loading = computed(() => stores.preloader.state.loading);
</script>

<style></style>
