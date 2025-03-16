import type { ChannelBase } from "../models";
import { ThumbnailPublicDTO } from "./thumbnail-public-dto";

export class ChannelPublicDTO {
  id!: string;
  title!: string;
  customUrl!: string;
  thumbnail!: ThumbnailPublicDTO;

  build() {
    const properties = [
      ["ID", this.id],
      ["Title", this.title],
      ["Custom URL", this.customUrl],
      ["Thumbnail", this.thumbnail],
    ];

    for (const [property, value] of properties) {
      if (value === undefined) throw new Error(`ChannelPublicDTO [${property} is not defined.]`);
    }

    return this;
  }

  static buildFrom(payload: ChannelBase): ChannelPublicDTO {
    const { id, title, customUrl, thumbnails } = payload;
    const instance = new ChannelPublicDTO();

    instance.id = id;
    instance.title = title;
    instance.customUrl = customUrl;
    instance.thumbnail = ThumbnailPublicDTO.buildFrom(thumbnails.high);

    return instance.build();
  }
}
