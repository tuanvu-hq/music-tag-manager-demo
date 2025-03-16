<template>
  <div class="grid">
    <ButtonGeneral :styling="[themeValue.bg.hover, 'hover:text-white']" :disabling="true">
      <p>Add channel</p>
    </ButtonGeneral>
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
