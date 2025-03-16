<template>
  <div>
    <NuxtLoadingIndicator />
    <NuxtPage />
  </div>
</template>

<script lang="ts" setup>
import "reflect-metadata";

import { onNuxtReady, useHead } from "#imports";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { onBeforeMount, onMounted, onUnmounted } from "vue";
import { useStorePreloader } from "./stores/preloader";
import { useStoreTheme } from "./stores/theme";
import { displayScrollbar } from "./utils/scrollbar";

useHead({
  link: [
    { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
    { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
    { rel: "icon", type: "image/png", sizes: "192x192", href: "/android-chrome-192x192.png" },
    { rel: "icon", type: "image/png", sizes: "512x512", href: "/android-chrome-512x512.png" },
  ],
});

onBeforeMount(() => {});

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
});

onNuxtReady(async () => {});

onUnmounted(() => {});
</script>

<style></style>
