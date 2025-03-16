import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { DEFAULT_PLAYBACK, DEFAULT_TIME, DEFAULT_VOLUME } from "../constants";
import type { VideoPublicDTO } from "../database/dto";
import type { Playback, Time, Volume } from "../types";
import { paginateVideosPlaylist$ } from "../utils/api";
import { useStoreList } from "./list";
import { useStorePagination } from "./pagination";
import { useStorePreloader } from "./preloader";
import { useStoreVideo } from "./video";

type PropsActionHandleStateChange = YT.OnStateChangeEvent;

export const useStorePlayer = defineStore("[Music Tag Manager V1] Player", () => {
  const stores = {
    list: useStoreList(),
    pagination: useStorePagination(),
    player: useStorePlayer(),
    preloader: useStorePreloader(),
    video: useStoreVideo(),
  };

  const player = ref<YT.Player | null>(null);
  const playback = ref<Playback>({ ...DEFAULT_PLAYBACK });
  const time = ref<Time>({ ...DEFAULT_TIME });
  const volume = ref<Volume>({ ...DEFAULT_VOLUME });

  const state = {
    player,
    playback,
    time,
    volume,
  };

  const get = {};

  const set = {
    continuing: (payload: boolean) => (playback.value = { ...playback.value, continuing: payload }),
    player: (payload: YT.Player | null) => (player.value = payload),
    playing: (payload: boolean) => (playback.value = { ...playback.value, playing: payload }),
    repeating: (payload: boolean) => (playback.value = { ...playback.value, repeating: payload }),
    shuffling: (payload: boolean) => (playback.value = { ...playback.value, shuffling: payload }),
    volume: (payload: number) => setVolume(payload),
  };

  const action = {
    cueVideo: (payload: VideoPublicDTO) => actionCueVideo(payload),
    handleOnReady: () => actionHandleOnReady(),
    handleStateChange$: async (payload: PropsActionHandleStateChange) => await actionHandleStateChange$(payload),
    listenToMessageEvents: () => actionListenToMessageEvents(),
    pauseVideo: () => actionPauseVideo(),
    playVideo: () => actionPlayVideo(),
    resetTime: () => (time.value = { ...DEFAULT_TIME }),
    seekTo: (payload: number) => actionSeekTo(payload),
    toggleContinuing: () => (playback.value = { ...playback.value, continuing: !playback.value.continuing }),
    togglePlaying: () => actionTogglePlaying(),
    toggleRepeating: () => (playback.value = { ...playback.value, repeating: !playback.value.repeating }),
    toggleShuffling: () => (playback.value = { ...playback.value, shuffling: !playback.value.shuffling }),
    toggleVolume: () => actionToggleVolume(),
  };

  const setVolume = (payload: number) => {
    volume.value = { ...volume.value, current: payload, previous: 0 };

    if (!player.value) return;

    player.value.setVolume(payload);
  };

  const actionCueVideo = (payload: VideoPublicDTO) => {
    if (!player.value) return;

    player.value.cueVideoById(payload.id);
  };

  const actionHandleOnReady = () => {
    stores.preloader.set.loading(false);
    setVolume(100);
  };

  const actionHandleStateChange$ = async (event: PropsActionHandleStateChange) => {
    const playlist = computed(() => stores.list.state.lists.tab_controls_playlist);
    const pagination = computed(() => stores.pagination.state.paginations.tab_controls_playlist);
    const index = computed(() => stores.video.state.index);
    const shuffling = computed(() => stores.player.state.playback.shuffling);

    if (event.data === YT.PlayerState.CUED) {
      set.playing(true);
      action.playVideo();
    }

    if (event.data === YT.PlayerState.PLAYING) {
      if (!player.value) return;

      player.value.setPlaybackQuality(event.target.getPlaybackQuality());
    }

    if (event.data === YT.PlayerState.ENDED) {
      if (playback.value.repeating) {
        set.playing(true);
        action.playVideo();
      }

      if (!playback.value.repeating && playback.value.continuing) {
        const i = index.value;
        const { page, limit, current, total } = pagination.value.pagination;
        const indexing = (page - 1) * limit;

        if (i + 1 + indexing < current + indexing) {
          const video = playlist.value[i + 1] as VideoPublicDTO;

          stores.video.set.video(video);
          stores.video.set.index(i + 1);
          action.cueVideo(video);
        }

        if (i + 1 + indexing === current + indexing) {
          const checkpoint = page * limit < total;

          if (checkpoint) {
            const { data, pagination } = await paginateVideosPlaylist$({ shuffling: shuffling.value, pagination: { page: page + 1 } });

            stores.list.set.list({ listKey: "tab_controls_playlist", data });
            stores.pagination.set.pagination({ paginationKey: "tab_controls_playlist", pagination });

            stores.video.set.index(0);

            const video = playlist.value[0] as VideoPublicDTO;

            stores.video.set.video(video);
            action.cueVideo(video);
            stores.list.action.scrollTo({ scrollToKey: "tab_controls_playlist", index: 0 });
          }

          if (!checkpoint) {
            set.playing(false);
          }
        }
      }

      if (!playback.value.repeating && !playback.value.continuing) {
        set.playing(false);
      }
    }
  };

  const actionListenToMessageEvents = () => {
    if (!player.value) return;

    const currentTime = player.value.getCurrentTime();
    const duration = player.value.getDuration();

    const currentCeil = Math.ceil(currentTime);
    const endCeil = Math.ceil(duration);

    const checkpoint = currentCeil === endCeil;

    time.value = {
      current: currentCeil,
      end: endCeil,
      progress: checkpoint ? currentCeil / endCeil : currentTime / duration,
    };
  };

  const actionPauseVideo = () => {
    if (!player.value) return;
    if (!stores.video.state.video) return;

    player.value.pauseVideo();
  };

  const actionPlayVideo = () => {
    if (!player.value) return;
    if (!stores.video.state.video) return;

    player.value.playVideo();
  };

  const actionSeekTo = (payload: number) => {
    if (!player.value) return;
    if (!stores.video.state.video) return;

    player.value.seekTo(payload, true);
  };

  const actionTogglePlaying = () => {
    const prev = playback.value.playing;

    if (!stores.video.state.video) return;

    playback.value = { ...playback.value, playing: !prev };

    if (!player.value) return;

    prev ? player.value.pauseVideo() : player.value.playVideo();
  };

  const actionToggleVolume = () => {
    const current = volume.value.current;
    const previous = volume.value.previous;

    volume.value = { current: previous, previous: current };

    if (!player.value) return;

    player.value.setVolume(previous);
  };

  return { state, get, set, action };
});
