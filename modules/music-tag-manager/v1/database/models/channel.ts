import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import type { TypeormClassPropertyTuple, YoutubeChannel } from "../../types";
import { timezoneTransformer } from "../../utils/typeorm";
import { ChannelThumbnailBase, ChannelThumbnailTypeorm } from "./channel-thumbnail";
import { LocalizedBase, LocalizedTypeorm } from "./localized";
import { VideoTypeorm, type VideoBase } from "./video";

export class ChannelBase {
  @PrimaryColumn("text", { name: "id" })
  id!: string;
  @Column("text", { name: "kind" })
  kind!: string;
  @Column("text", { name: "etag" })
  etag!: string;
  @Column("text", { name: "title" })
  title!: string;
  @Column("text", { name: "description" })
  description!: string;
  @Column("text", { name: "custom_url" })
  customUrl!: string;
  @Column("text", { name: "published_at" })
  publishedAt!: string;
  @Column("text", { name: "default_language", nullable: true })
  defaultLanguage?: string;
  @Column("text", { name: "country", nullable: true })
  country?: string;
  @OneToOne(() => LocalizedTypeorm, (localized) => localized.uuid, { cascade: ["insert", "update", "remove"] })
  @JoinColumn({ name: "localized" })
  localized!: LocalizedBase;
  @OneToOne(() => ChannelThumbnailTypeorm, (thumbnails) => thumbnails.uuid, { cascade: ["insert", "update", "remove"] })
  @JoinColumn({ name: "thumbnails" })
  thumbnails!: ChannelThumbnailBase;
  @ManyToMany(() => VideoTypeorm, (video) => video.channels, { cascade: ["insert", "update"] })
  @JoinTable({ name: "channel_to_video", joinColumn: { name: "channel", referencedColumnName: "id" }, inverseJoinColumn: { name: "video", referencedColumnName: "id" } })
  videos!: VideoBase[];

  setId(payload: string) {
    this.id = payload;

    return this;
  }

  setKind(payload: string) {
    this.kind = payload;

    return this;
  }

  setEtag(payload: string) {
    this.etag = payload;

    return this;
  }

  setTitle(payload: string) {
    this.title = payload;

    return this;
  }

  setDescription(payload: string) {
    this.description = payload;

    return this;
  }

  setCustomUrl(payload: string) {
    this.customUrl = payload;

    return this;
  }

  setPublishedAt(payload: string) {
    this.publishedAt = payload;

    return this;
  }

  setDefaultLanguage(payload: string | undefined) {
    this.defaultLanguage = payload;

    return this;
  }

  setCountry(payload: string | undefined) {
    this.country = payload;

    return this;
  }

  setLocalized(payload: LocalizedTypeorm) {
    this.localized = payload;

    return this;
  }

  setThumbnails(payload: ChannelThumbnailTypeorm) {
    this.thumbnails = payload;

    return this;
  }

  setVideos(payload: VideoTypeorm[]) {
    this.videos = payload;

    return this;
  }

  build() {
    const properties: TypeormClassPropertyTuple[] = [
      ["ID", this.id],
      ["Kind", this.kind],
      ["E Tag", this.etag],
      ["Title", this.title],
      ["Description", this.description],
      ["Custom URL", this.customUrl],
      ["Published At", this.publishedAt],
      ["Localized", this.localized],
      ["Thumbnails", this.thumbnails],
      ["Videos", this.videos],
    ];

    for (const [property, value] of properties) {
      if (value === undefined) throw new Error(`ChannelBase [${property}] is not defined.`);
    }

    return this;
  }
}

@Entity("channel")
export class ChannelTypeorm extends ChannelBase {
  @CreateDateColumn(timezoneTransformer({ name: "created_at" }))
  createdAt!: Date;
  @UpdateDateColumn(timezoneTransformer({ name: "updated_at" }))
  updatedAt!: Date;

  buildFrom(payload: YoutubeChannel) {
    const { id, kind, etag, snippet } = payload;
    const { title, description, customUrl, publishedAt, defaultLanguage, country, thumbnails, localized } = snippet;

    const _localized = new LocalizedTypeorm().buildFrom(localized);
    const _thumbnails = new ChannelThumbnailTypeorm().buildFrom(thumbnails);

    // prettier-ignore
    return new ChannelTypeorm()
    .setId(id)
    .setKind(kind)
    .setEtag(etag)
    .setTitle(title)
    .setDescription(description)
    .setCustomUrl(customUrl)
    .setPublishedAt(publishedAt)
    .setDefaultLanguage(defaultLanguage)
    .setCountry(country)
    .setLocalized(_localized)
    .setThumbnails(_thumbnails)
    .setVideos([])
    .build();
  }
}

export class ChannelSeed {
  id!: string;
  kind!: string;
  etag!: string;
  title!: string;
  description!: string;
  customUrl!: string;
  publishedAt!: string;
  defaultLanguage?: string;
  country?: string;
  localizedUuid!: string;
  thumbnailsUuid!: string;
  videoIds!: string[];

  build() {
    const properties: TypeormClassPropertyTuple[] = [
      ["ID", this.id],
      ["Kind", this.kind],
      ["E Tag", this.etag],
      ["Title", this.title],
      ["Description", this.description],
      ["Custom URL", this.customUrl],
      ["Published At", this.publishedAt],
      ["Localized UUID", this.localizedUuid],
      ["Thumbnails UUID", this.thumbnailsUuid],
      ["Video IDs", this.videoIds],
    ];

    for (const [property, value] of properties) {
      if (value === undefined) throw new Error(`ChannelSeed [${property}] is not defined.`);
    }

    return this;
  }

  buildFrom(payload: ChannelBase) {
    const { id, kind, etag, title, description, customUrl, publishedAt, defaultLanguage, country, localized, thumbnails, videos } = payload;

    this.id = id;
    this.kind = kind;
    this.etag = etag;
    this.title = title;
    this.description = description;
    this.customUrl = customUrl;
    this.publishedAt = publishedAt;
    this.defaultLanguage = defaultLanguage;
    this.country = country;
    this.localizedUuid = localized.uuid;
    this.thumbnailsUuid = thumbnails.uuid;
    this.videoIds = [...videos].map((video) => video.id);

    return this.build();
  }
}
