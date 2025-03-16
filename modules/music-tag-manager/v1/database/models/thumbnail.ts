import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { uuidGenerator } from "~/utils/uuid";
import type { TypeormClassPropertyTuple, YoutubeThumbnail } from "../../types";
import { timezoneTransformer } from "../../utils/typeorm";

export class ThumbnailBase {
  @PrimaryColumn("uuid", { name: "uuid" })
  uuid!: string;
  @Column("text", { name: "url" })
  url!: string;
  @Column("integer", { name: "width" })
  width!: number;
  @Column("integer", { name: "height" })
  height!: number;

  setUuid(payload: string) {
    this.uuid = payload;

    return this;
  }

  setUrl(payload: string) {
    this.url = payload;

    return this;
  }

  setWidth(payload: number) {
    this.width = payload;

    return this;
  }

  setHeight(payload: number) {
    this.height = payload;

    return this;
  }

  build() {
    if (this.uuid === undefined) this.uuid = uuidGenerator();

    const properties: TypeormClassPropertyTuple[] = [
      ["UUID", this.uuid],
      ["URL", this.url],
      ["Width", this.width],
      ["Height", this.height],
    ];

    for (const [property, value] of properties) {
      if (value === undefined) throw new Error(`ThumbnailBase [${property}] is not defined.`);
    }

    return this;
  }
}

@Entity("thumbnail")
export class ThumbnailTypeorm extends ThumbnailBase {
  @CreateDateColumn(timezoneTransformer({ name: "created_at" }))
  createdAt!: Date;
  @UpdateDateColumn(timezoneTransformer({ name: "updated_at" }))
  updatedAt!: Date;

  buildFrom(payload: YoutubeThumbnail) {
    const { url, width, height } = payload;

    // prettier-ignore
    return new ThumbnailTypeorm()
    .setUrl(url)
    .setWidth(width)
    .setHeight(height)
    .build()
  }
}

export class ThumbnailSeed {
  uuid!: string;
  url!: string;
  width!: number;
  height!: number;

  build() {
    const properties: TypeormClassPropertyTuple[] = [
      ["UUID", this.uuid],
      ["URL", this.url],
      ["Width", this.width],
      ["Height", this.height],
    ];

    for (const [property, value] of properties) {
      if (value === undefined) throw new Error(`ThumbnailSeed [${property}] is not defined.`);
    }

    return this;
  }

  buildFrom(payload: ThumbnailBase) {
    this.uuid = payload.uuid;
    this.url = payload.url;
    this.width = payload.width;
    this.height = payload.height;

    return this.build();
  }
}
