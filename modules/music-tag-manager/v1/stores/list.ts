import { defineStore } from "pinia";
import { ref } from "vue";
import type { TagCategoryPublicDTO, TagPublicDTO } from "../database/dto";
import type { Displayings, DisplayKey, ListKey, Lists, ScrollTo, ScrollToKey, ScrollTos } from "../types";
import { generatePlaylist$, paginateTags$, paginateVideosPlaylist$ } from "../utils/api";
import { getBrandedUUID } from "../utils/brand";
import { useStorePagination } from "./pagination";
import { useStorePlayer } from "./player";
import { useStoreVideo } from "./video";

type PropsSleep = { ms?: number };

type PropsSetScrollTo = { scrollToKey: ScrollToKey; scrollTo: ScrollTo };

type PropsSetList = { listKey: ListKey; data: any[] };

type PropsActionScrollTo = { scrollToKey: ScrollToKey; index: number };

type PropsActionDisplaySelectedTags = { tagCategory: string };

type PropsActionToggleSelectedTags = { tag: TagPublicDTO };

type PropsActionToggleDisplaying = { displayKey: DisplayKey };

type PropsActionGeneratePlaylist = { page: number };

export const useStoreList = defineStore("[Music Tag Manager V1] List", () => {
  const stores = {
    pagination: useStorePagination(),
    player: useStorePlayer(),
    video: useStoreVideo(),
  };

  const lists = ref<Lists>({
    tab_controls_playlist: [],
    tab_controls_tags: [],
    tab_controls_selected_tags: [],
    tab_detail_generate_playlist_selected_tag_categories: [],
    tab_detail_generate_playlist_selected_tags: [],
    tab_general_channels: [],
    tab_general_videos: [],
    tag_categories: [],
    tags: [],
  });
  const scrollTos = ref<ScrollTos>({
    tab_controls_playlist: () => null,
    tab_general_channels: () => null,
    tab_general_videos: () => null,
    tag_categories: () => null,
  });
  const displayings = ref<Displayings>({
    tab_detail_generate_playlist_selected_tag_categories: false,
  });
  const exactMatch = ref(false);
  const loading = ref(false);

  const state = {
    displayings,
    exactMatch,
    lists,
    loading,
    scrollTos,
  };

  const get = {};

  const set = {
    list: ({ listKey, data }: PropsSetList) => (lists.value[listKey] = data),
    loading: (payload: boolean) => (loading.value = payload),
    scrollTo: ({ scrollToKey, scrollTo }: PropsSetScrollTo) => (scrollTos.value[scrollToKey] = scrollTo),
  };

  const action = {
    displaySelectedTags$: async (payload: PropsActionDisplaySelectedTags) => await actionDisplaySelectedTags$(payload),
    generatePlaylist$: async (payload?: PropsActionGeneratePlaylist) => await actionGeneratePlaylist$(payload),
    scrollTo: (payload: PropsActionScrollTo) => actionScrollTo(payload),
    toggleDisplaying: ({ displayKey }: PropsActionToggleDisplaying) => (displayings.value[displayKey] = !displayings.value[displayKey]),
    toggleExactMatch: () => actionToggleExactMatch(),
    toggleSelectedTags: (payload: PropsActionToggleSelectedTags) => actionToggleSelectedTags(payload),
  };

  const actionDisplaySelectedTags$ = async ({ tagCategory }: PropsActionDisplaySelectedTags) => {
    const START = Date.now();

    loading.value = true;

    await sleep$({ ms: 300 });

    const { data } = await paginateTags$({ tagCategory, pagination: { limit: 1000, page: 1 } });

    const END = Date.now();
    const DIFF = END - START;

    setTimeout(
      () => {
        lists.value.tags = data;
        loading.value = false;
      },
      Math.max(0, 500 - DIFF),
    );
  };

  const actionGeneratePlaylist$ = async (payload?: PropsActionGeneratePlaylist) => {
    const page = payload?.page || 1;
    const tags = [...lists.value.tab_detail_generate_playlist_selected_tags].map((tag) => getBrandedUUID({ uuid: tag.uuid }));
    const _exactMatch = exactMatch.value;
    const shuffling = stores.player.state.playback.shuffling;
    const player = stores.player.state.player;

    stores.pagination.set.loading(true);

    if (player) {
      if (player.getPlayerState() === YT.PlayerState.PLAYING) {
        player.stopVideo();
      }

      stores.video.set.video(null);
      stores.video.set.index(-1);
    }

    await generatePlaylist$({ tags, exactMatch: _exactMatch });

    await sleep$({ ms: 300 });

    const { data, pagination } = await paginateVideosPlaylist$({ shuffling, pagination: { page } });

    lists.value.tab_controls_playlist = data;

    stores.pagination.set.pagination({ paginationKey: "tab_controls_playlist", pagination });
    stores.pagination.set.loading(false);
  };

  const actionScrollTo = ({ scrollToKey, index }: PropsActionScrollTo) => {
    if (!scrollTos.value[scrollToKey]) return;

    scrollTos.value[scrollToKey](index);
  };

  const actionToggleSelectedTags = ({ tag }: PropsActionToggleSelectedTags) => {
    const prev = [...lists.value.tab_detail_generate_playlist_selected_tags] as TagPublicDTO[];

    {
      const uuids = new Set(prev.map((tag) => tag.uuid));
      const tags = uuids.has(tag.uuid) ? prev.filter((_tag) => _tag.uuid !== tag.uuid) : [...prev, tag];

      lists.value.tab_detail_generate_playlist_selected_tags = tags;

      {
        const tagCategories = [] as TagCategoryPublicDTO[];

        tags.forEach((tag) => {
          const uuids = new Set(tagCategories.map((tagCategory) => tagCategory.uuid));

          if (!uuids.has(tag.tagCategory.uuid)) tagCategories.push(tag.tagCategory);
        });

        lists.value.tab_detail_generate_playlist_selected_tag_categories = tagCategories.sort((a, b) => a.title.localeCompare(b.title));
      }
    }
  };

  const actionToggleExactMatch = () => {
    const prev = exactMatch.value;

    exactMatch.value = !prev;
  };

  const sleep$ = async ({ ms = 1000 }: PropsSleep) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  return { state, get, set, action };
});
