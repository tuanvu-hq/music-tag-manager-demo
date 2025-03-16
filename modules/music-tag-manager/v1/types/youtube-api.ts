type ChannelBase<Thumbnails, Localized> = {
  kind: string;
  etag: string;
  id: string;
  snippet: {
    title: string;
    description: string;
    customUrl: string;
    publishedAt: string;
    thumbnails: Thumbnails;
    defaultLanguage?: string;
    localized: Localized;
    country?: string;
  };
};

type VideoBase<Thumbnails, Localized> = {
  kind: string;
  etag: string;
  id: string;
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: Thumbnails;
    channelTitle: string;
    tags?: string[];
    categoryId: string;
    liveBroadcastContent: string;
    localized: Localized;
    defaultAudioLanguage?: string;
  };
};

type LocalizedBase = {
  title: string;
  description: string;
};

type ThumbnailBase = {
  url: string;
  width: number;
  height: number;
};

type ChannelThumbnailsBase<Thumbnail> = {
  default: Thumbnail;
  medium: Thumbnail;
  high: Thumbnail;
};

type VideoThumbnailsBase<Thumbnail> = {
  default: Thumbnail;
  medium: Thumbnail;
  high: Thumbnail;
  standard?: Thumbnail;
  maxres?: Thumbnail;
};

export type YoutubeLocalized = LocalizedBase;

export type YoutubeThumbnail = ThumbnailBase;

export type YoutubeChannelThumbnails = ChannelThumbnailsBase<YoutubeThumbnail>;

export type YoutubeVideoThumbnails = VideoThumbnailsBase<YoutubeThumbnail>;

export type YoutubeVideo = VideoBase<YoutubeVideoThumbnails, YoutubeLocalized>;

export type YoutubeChannel = ChannelBase<YoutubeChannelThumbnails, YoutubeLocalized>;

export type YoutubeResponse<T> = {
  kind: string;
  etag: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: T[];
};
