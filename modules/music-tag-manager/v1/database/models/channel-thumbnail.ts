import { CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { uuidGenerator } from "~/utils/uuid";
import type { TypeormClassPropertyTuple, YoutubeChannelThumbnails } from "../../types";
import { timezoneTransformer } from "../../utils/typeorm";
import { ThumbnailBase, ThumbnailTypeorm } from "./thumbnail";

export class ChannelThumbnailBase {
  @PrimaryColumn("uuid", { name: "uuid" })
  uuid!: string;
  @OneToOne(() => ThumbnailTypeorm, (thumbnail) => thumbnail.uuid, { cascade: ["insert", "update", "remove"] })
  @JoinColumn({ name: "default" })
  default!: ThumbnailBase;
  @OneToOne(() => ThumbnailTypeorm, (thumbnail) => thumbnail.uuid, { cascade: ["insert", "update", "remove"] })
  @JoinColumn({ name: "medium" })
  medium!: ThumbnailBase;
  @OneToOne(() => ThumbnailTypeorm, (thumbnail) => thumbnail.uuid, { cascade: ["insert", "update", "remove"] })
  @JoinColumn({ name: "high" })
  high!: ThumbnailBase;

  setUuid(payload: string) {
    this.uuid = payload;

    return this;
  }

  setDefault(payload: ThumbnailTypeorm) {
    this.default = payload;

    return this;
  }

  setMedium(payload: ThumbnailTypeorm) {
    this.medium = payload;

    return this;
  }

  setHigh(payload: ThumbnailTypeorm) {
    this.high = payload;

    return this;
  }

  build() {
    if (this.uuid === undefined) this.uuid = uuidGenerator();

    const properties: TypeormClassPropertyTuple[] = [
      ["UUID", this.uuid],
      ["Default", this.default],
      ["Medium", this.medium],
      ["High", this.high],
    ];

    for (const [property, value] of properties) {
      if (value === undefined) throw new Error(`ChannelThumbnailBase [${property}] is not defined.`);
    }

    return this;
  }
}

@Entity("channel_thumbnail")
export class ChannelThumbnailTypeorm extends ChannelThumbnailBase {
  @CreateDateColumn(timezoneTransformer({ name: "created_at" }))
  createdAt!: Date;
  @UpdateDateColumn(timezoneTransformer({ name: "updated_at" }))
  updatedAt!: Date;

  buildFrom(payload: YoutubeChannelThumbnails) {
    const _default = new ThumbnailTypeorm().buildFrom(payload.default);
    const medium = new ThumbnailTypeorm().buildFrom(payload.medium);
    const high = new ThumbnailTypeorm().buildFrom(payload.high);

    // prettier-ignore
    return new ChannelThumbnailTypeorm()
    .setDefault(_default)
    .setMedium(medium)
    .setHigh(high)
    .build()
  }
}

export class ChannelThumbnailSeed {
  uuid!: string;
  defaultUuid!: string;
  mediumUuid!: string;
  highUuid!: string;

  build() {
    const properties: TypeormClassPropertyTuple[] = [
      ["UUID", this.uuid],
      ["Default UUID", this.defaultUuid],
      ["Medium UUID", this.mediumUuid],
      ["High UUID", this.highUuid],
    ];

    for (const [property, value] of properties) {
      if (value === undefined) throw new Error(`ChannelThumbnailSeed [${property}] is not defined.`);
    }

    return this;
  }

  buildFrom(payload: ChannelThumbnailBase) {
    const { uuid, default: _default, medium, high } = payload;

    this.uuid = uuid;
    this.defaultUuid = _default.uuid;
    this.mediumUuid = medium.uuid;
    this.highUuid = high.uuid;

    return this.build();
  }
}
