<template>
  <div class="absolute top-0 right-0 bottom-0 left-0 z-20 grid overflow-hidden p-10 backdrop-blur duration-300" :class="[{ 'pointer-events-auto opacity-100': visible, 'pointer-events-none opacity-0': !visible }]">
    <div class="grid grid-cols-[2fr_3fr] overflow-hidden rounded bg-slate-50 text-neutral-950 dark:bg-neutral-950 dark:text-slate-50">
      <div class="flex items-center justify-center p-10">
        <img class="h-100 w-100 shrink-0 rotate-y-180" src="/img/celebrating.png" alt="Celebrating" />
      </div>
      <div class="grid overflow-hidden p-10">
        <div class="space-y-10 overflow-y-scroll pr-6">
          <p class="text-6xl font-bold">Welcome</p>
          <div class="space-y-2">
            <p class="text-xl font-bold">Disclaimer:</p>
            <p>This is a demonstration only. Not all functionalities are enabled or available in this demo.</p>
            <div class="flex h-10 items-center justify-end pr-5">
              <NuxtLink class="font-bold text-blue-500 duration-300 hover:scale-125 hover:text-blue-400" to="https://github.com/tuanvu-hq/music-tag-manager-demo" target="_blank">Github repository</NuxtLink>
            </div>
          </div>
          <div class="space-y-2">
            <p class="text-xl font-bold">How to use Music Tag Manager:</p>
            <p class="text-justify">Hover over the center-right for the <span class="font-bold">General</span> tab slider, or center-bottom for <span class="font-bold">Controls</span> tab slider. Click the slider to open the tab.</p>
          </div>
          <div class="flex h-50 gap-5">
            <div class="relative flex h-full w-full items-center justify-center border border-slate-200 bg-neutral-950 dark:border-neutral-800">
              <YouTube class="aspect-video w-25 text-red-500" />
              <Cursor class="absolute top-1/2 right-0 z-5 h-5 w-5" />
              <div class="absolute top-0 right-0 bottom-0 w-7 border-l-4 border-dashed border-blue-500 bg-blue-500/50"></div>
            </div>
            <div class="relative flex h-full w-full items-center justify-center border border-slate-200 bg-neutral-950 dark:border-neutral-800">
              <YouTube class="aspect-video w-25 text-red-500" />
              <Cursor class="absolute bottom-0 left-1/2 z-5 h-5 w-5" />
              <div class="absolute right-0 bottom-0 left-0 h-7 border-t-4 border-dashed border-blue-500 bg-blue-500/50"></div>
            </div>
          </div>
          <div class="space-y-2">
            <p class="text-xl font-bold">Controls tab:</p>
            <p class="text-justify">The Controls tab provides the user with functionality to control playback, manage and generate playlists, and access video metadata tags.</p>
          </div>
          <div class="space-y-2">
            <p class="text-xl font-bold">General tab:</p>
            <p class="text-justify">The General tab provides access to available channels, video content, tag categories and individual tags, and application settings.</p>
          </div>
          <div class="flex justify-end">
            <button class="ml-auto w-fit cursor-pointer rounded bg-blue-500 px-4 py-2 text-white duration-300 hover:bg-blue-400" @click="onClose">Continue</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Cursor, YouTube } from "~/components/icons";

const visible = ref(true);

const onClose = () => {
  visible.value = false;
};
</script>

<style></style>
