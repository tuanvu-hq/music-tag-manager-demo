import { CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { uuidGenerator } from "~/utils/uuid";
import type { TypeormClassPropertyTuple, YoutubeVideoThumbnails } from "../../types";
import { timezoneTransformer } from "../../utils/typeorm";
import { ThumbnailBase, ThumbnailTypeorm } from "./thumbnail";

export class VideoThumbnailBase {
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
  @OneToOne(() => ThumbnailTypeorm, (thumbnail) => thumbnail.uuid, { cascade: ["insert", "update", "remove"], nullable: true })
  @JoinColumn({ name: "standard" })
  standard?: ThumbnailBase;
  @OneToOne(() => ThumbnailTypeorm, (thumbnail) => thumbnail.uuid, { cascade: ["insert", "update", "remove"], nullable: true })
  @JoinColumn({ name: "maxres" })
  maxres?: ThumbnailBase;

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

  setStandard(payload: ThumbnailTypeorm | undefined) {
    this.standard = payload;

    return this;
  }

  setMaxres(payload: ThumbnailTypeorm | undefined) {
    this.maxres = payload;

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
      if (value === undefined) throw new Error(`VideoThumbnailBase [${property}] is not defined.`);
    }

    return this;
  }
}

@Entity("video_thumbnail")
export class VideoThumbnailTypeorm extends VideoThumbnailBase {
  @CreateDateColumn(timezoneTransformer({ name: "created_at" }))
  createdAt!: Date;
  @UpdateDateColumn(timezoneTransformer({ name: "updated_at" }))
  updatedAt!: Date;

  buildFrom(payload: YoutubeVideoThumbnails) {
    const _default = new ThumbnailTypeorm().buildFrom(payload.default);
    const medium = new ThumbnailTypeorm().buildFrom(payload.medium);
    const high = new ThumbnailTypeorm().buildFrom(payload.high);
    const standard = payload.standard ? new ThumbnailTypeorm().buildFrom(payload.standard) : undefined;
    const maxres = payload.maxres ? new ThumbnailTypeorm().buildFrom(payload.maxres) : undefined;

    // prettier-ignore
    return new VideoThumbnailTypeorm()
    .setDefault(_default)
    .setMedium(medium)
    .setHigh(high)
    .setStandard(standard)
    .setMaxres(maxres)
    .build()
  }
}

export class VideoThumbnailSeed {
  uuid!: string;
  defaultUuid!: string;
  mediumUuid!: string;
  highUuid!: string;
  standardUuid!: string;
  maxresUuid?: string;

  build() {
    const properties: TypeormClassPropertyTuple[] = [
      ["UUID", this.uuid],
      ["Default UUID", this.defaultUuid],
      ["Medium UUID", this.mediumUuid],
      ["High UUID", this.highUuid],
      ["Standard UUID", this.standardUuid],
      ["Maxres UUID", this.maxresUuid],
    ];

    for (const [property, value] of properties) {
      if (value === undefined) throw new Error(`VideoThumbnailSeed [${property}] is not defined.`);
    }

    return this;
  }

  buildFrom(payload: VideoThumbnailBase) {
    const { uuid, default: _default, medium, high, standard, maxres } = payload;

    this.uuid = uuid;
    this.defaultUuid = _default.uuid;
    this.mediumUuid = medium.uuid;
    this.highUuid = high.uuid;
    this.standardUuid = standard ? standard.uuid : "";
    this.maxresUuid = maxres ? maxres.uuid : "";

    return this.build();
  }
}
