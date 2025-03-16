<template>
  <div class="absolute top-0 right-0 bottom-0 left-0 z-10 backdrop-blur-xs duration-300" :class="[{ 'pointer-events-none opacity-0': !visible, 'pointer-events-auto opacity-100': visible }]"></div>
</template>

<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps<{
  visible: boolean;
}>();

const visible = computed(() => props.visible);
</script>

<style></style>
