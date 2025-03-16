import type { VideoBase } from "../models";
import { TagPublicDTO } from "./tag-public-dto";
import { ThumbnailPublicDTO } from "./thumbnail-public-dto";

export class VideoPublicDTO {
  id!: string;
  title!: string;
  channelId!: string;
  channelTitle!: string;
  publishedAt!: string;
  thumbnail!: ThumbnailPublicDTO;
  customTags!: TagPublicDTO[];

  build() {
    const properties = [
      ["ID", this.id],
      ["Title", this.title],
      ["Channel ID", this.channelId],
      ["Channel Title", this.channelTitle],
      ["Published At", this.publishedAt],
      ["Thumbnail", this.thumbnail],
      ["Custom Tags", this.customTags],
    ];

    for (const property of properties) {
      if (!property) throw new Error(`VideoBaseDTO [${property} is not defined.]`);
    }

    return this;
  }

  static buildFrom(payload: VideoBase) {
    const { id, title, channelId, channelTitle, publishedAt, thumbnails, customTags } = payload;
    const instance = new VideoPublicDTO();

    instance.id = id;
    instance.title = title;
    instance.channelId = channelId;
    instance.channelTitle = channelTitle;
    instance.publishedAt = publishedAt;
    instance.thumbnail = ThumbnailPublicDTO.buildFrom(thumbnails.high);
    instance.customTags = [...customTags].map((tag) => TagPublicDTO.buildFrom(tag));

    return instance.build();
  }
}
