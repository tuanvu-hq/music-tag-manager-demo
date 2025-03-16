import type { Pagination } from "./pagination";
import type {} from "./typeorm";
import type { YoutubeChannel, YoutubeVideo } from "./youtube-api";

type GetQueryParamsBase = { limit?: number; page?: number };

export type ApiBodyChannel = { channel: YoutubeChannel };
export type ApiBodyChannelFetch = { customUrl: string };
export type ApiBodyPlaywrightScrapeYoutube = { customUrl: string; scrapeType: "newest" | "full" };
export type ApiBodyTheme = { color?: string; mode?: string };
export type ApiBodyVideo = { video: YoutubeVideo };
export type ApiBodyVideoFetch = { id: string; customUrl?: string };
export type ApiBodyVideoPlaylist = { tags: string[]; exactMatch: string };
export type ApiQueryParamsChannel = {} & GetQueryParamsBase;
export type ApiQueryParamsTag = { tag_category: string } & GetQueryParamsBase;
export type ApiQueryParamsTagCategory = {} & GetQueryParamsBase;
export type ApiQueryParamsVideo = {} & GetQueryParamsBase;
export type ApiQueryParamsVideoPlaylist = { shuffling: string } & GetQueryParamsBase;

export type RestApiResponseListCommon<T> = { data: T[]; pagination: Pagination };
