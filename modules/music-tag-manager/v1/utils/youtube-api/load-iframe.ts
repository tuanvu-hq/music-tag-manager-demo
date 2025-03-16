import { useStorePlayer } from "../../stores";

export const loadIframe = () => {
  const stores = {
    player: useStorePlayer(),
  };

  // @ts-ignore
  const player = new YT.Player("youtube-player", {
    width: "100%",
    height: "100%",
    videoId: undefined,
    playerVars: {
      controls: 0,
      cc_lang_pref: 0,
      cc_load_policy: 0,
      iv_load_policy: 3,
    },
    events: {
      onReady: (event) => {
        stores.player.action.handleOnReady();
      },
      onStateChange: async (event) => {
        await stores.player.action.handleStateChange$(event);
      },
    },
  });

  stores.player.set.player(player);
};
