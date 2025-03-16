import type { ThumbnailBase } from "../models";

export class ThumbnailPublicDTO {
  uuid!: string;
  url!: string;
  width!: number;
  height!: number;

  build() {
    const properties = [
      ["UUID", this.uuid],
      ["URL", this.url],
      ["Width", this.width],
      ["Height", this.height],
    ];

    for (const [property, value] of properties) {
      if (value === undefined) throw new Error(`ThumbnailPublicDTO [${property}] not defined.`);
    }

    return this;
  }

  static buildFrom(payload: ThumbnailBase) {
    const { uuid, url, width, height } = payload;
    const instance = new ThumbnailPublicDTO();

    instance.uuid = uuid;
    instance.url = url;
    instance.width = width;
    instance.height = height;

    return instance.build();
  }
}
