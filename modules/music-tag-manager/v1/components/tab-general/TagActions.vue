<template>
  <div class="grid">
    <div class="flex gap-2">
      <ButtonGeneral :styling="[themeValue.bg.hover, 'hover:text-white']" :disabling="true">
        <p>Add tag category</p>
      </ButtonGeneral>
      <ButtonGeneral :styling="[themeValue.bg.hover, 'hover:text-white']" :disabling="true">
        <p>Add tag</p>
      </ButtonGeneral>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useStoreTheme } from "../../stores";
import { ButtonGeneral } from "../shared";

const stores = {
  theme: useStoreTheme(),
};

const themeValue = computed(() => stores.theme.state.themeValue);
</script>

<style></style>
