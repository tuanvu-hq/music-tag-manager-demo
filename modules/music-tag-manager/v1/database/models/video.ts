import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import type { TypeormClassPropertyTuple, YoutubeVideo } from "../../types";
import { timezoneTransformer } from "../../utils/typeorm";
import { ChannelTypeorm, type ChannelBase } from "./channel";
import { LocalizedBase, LocalizedTypeorm } from "./localized";
import { TagBase, TagTypeorm } from "./tag";
import { VideoThumbnailBase, VideoThumbnailTypeorm } from "./video-thumbnail";

export class VideoBase {
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
  @Column("text", { name: "published_at" })
  publishedAt!: string;
  @Column("text", { name: "channel_id" })
  channelId!: string;
  @Column("text", { name: "channel_title" })
  channelTitle!: string;
  @Column("text", { name: "category_id" })
  categoryId!: string;
  @Column("text", { name: "youtube_tags", array: true, nullable: true })
  youtubeTags?: string[];
  @Column("text", { name: "default_audio_language", nullable: true })
  defaultAudioLanguage?: string;
  @Column("text", { name: "live_broadcast_content" })
  liveBroadcastContent!: string;
  @Column("boolean", { name: "hidden" })
  hidden!: boolean;
  @Column("boolean", { name: "stored" })
  stored!: boolean;
  @OneToOne(() => LocalizedTypeorm, (localized) => localized.uuid, { cascade: ["insert", "update", "remove"] })
  @JoinColumn({ name: "localized" })
  localized!: LocalizedBase;
  @OneToOne(() => VideoThumbnailTypeorm, (thumbnails) => thumbnails.uuid, { cascade: ["insert", "update", "remove"] })
  @JoinColumn({ name: "thumbnails" })
  thumbnails!: VideoThumbnailBase;
  @ManyToMany(() => TagTypeorm, (tag) => tag.videos, { cascade: ["insert", "update"] })
  @JoinTable({ name: "video_to_tag", joinColumn: { name: "video", referencedColumnName: "id" }, inverseJoinColumn: { name: "tag", referencedColumnName: "uuid" } })
  customTags!: TagBase[];
  @ManyToMany(() => ChannelTypeorm, (channel) => channel.videos)
  channels!: ChannelBase[];

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

  setPublishedAt(payload: string) {
    this.publishedAt = payload;

    return this;
  }

  setChannelId(payload: string) {
    this.channelId = payload;

    return this;
  }

  setChannelTitle(payload: string) {
    this.channelTitle = payload;

    return this;
  }

  setCategoryId(payload: string) {
    this.categoryId = payload;

    return this;
  }

  setYoutubeTags(payload: string[] | undefined) {
    this.youtubeTags = payload;

    return this;
  }

  setDefaultAudioLanguage(payload: string | undefined) {
    this.defaultAudioLanguage = payload;

    return this;
  }

  setLiveBroadcastContent(payload: string) {
    this.liveBroadcastContent = payload;

    return this;
  }

  setHidden(payload: boolean) {
    this.hidden = payload;

    return this;
  }

  setStored(payload: boolean) {
    this.stored = payload;

    return this;
  }

  setLocalized(payload: LocalizedTypeorm) {
    this.localized = payload;

    return this;
  }

  setThumbnails(payload: VideoThumbnailTypeorm) {
    this.thumbnails = payload;

    return this;
  }

  setCustomTags(payload: TagTypeorm[]) {
    this.customTags = payload;

    return this;
  }

  setChannels(payload: ChannelTypeorm[]) {
    this.channels = payload;

    return this;
  }

  build() {
    const properties: TypeormClassPropertyTuple[] = [
      ["ID", this.id],
      ["Kind", this.kind],
      ["E Tag", this.etag],
      ["Title", this.title],
      ["Description", this.description],
      ["Publised At", this.publishedAt],
      ["Channel ID", this.channelId],
      ["Channel Title", this.channelTitle],
      ["Category ID", this.categoryId],
      ["Live Broadcast Content", this.liveBroadcastContent],
      ["Hidden", this.hidden],
      ["Stored", this.stored],
      ["Localized", this.localized],
      ["Thumbnails", this.thumbnails],
      ["Custom Tags", this.customTags],
      ["Channels", this.channels],
    ];

    for (const [property, value] of properties) {
      if (value === undefined) throw new Error(`VideoBase [${property}] is not defined.`);
    }

    return this;
  }
}

@Entity("video")
export class VideoTypeorm extends VideoBase {
  @CreateDateColumn(timezoneTransformer({ name: "created_at" }))
  createdAt!: Date;
  @UpdateDateColumn(timezoneTransformer({ name: "updated_at" }))
  updatedAt!: Date;

  buildFrom(payload: YoutubeVideo) {
    const { id, kind, etag, snippet } = payload;
    const { title, description, publishedAt, channelId, channelTitle, categoryId, tags, defaultAudioLanguage, liveBroadcastContent, thumbnails, localized } = snippet;

    const _thumbnails = new VideoThumbnailTypeorm().buildFrom(thumbnails);
    const _localized = new LocalizedTypeorm().buildFrom(localized);

    // prettier-ignore
    return new VideoTypeorm()
    .setId(id)
    .setKind(kind)
    .setEtag(etag)
    .setTitle(title)
    .setDescription(description)
    .setPublishedAt(publishedAt)
    .setChannelId(channelId)
    .setChannelTitle(channelTitle)
    .setCategoryId(categoryId)
    .setYoutubeTags(tags)
    .setDefaultAudioLanguage(defaultAudioLanguage)
    .setLiveBroadcastContent(liveBroadcastContent)
    .setHidden(false)
    .setStored(false)
    .setLocalized(_localized)
    .setThumbnails(_thumbnails)
    .setCustomTags([])
    .setChannels([])
    .build();
  }
}

export class VideoSeed {
  id!: string;
  kind!: string;
  etag!: string;
  title!: string;
  description!: string;
  publishedAt!: string;
  channelId!: string;
  channelTitle!: string;
  categoryId!: string;
  youtubeTags!: string[];
  defaultAudioLanguage?: string;
  liveBroadcastContent!: string;
  hidden!: boolean;
  stored!: boolean;
  localizedUuid!: string;
  thumbnailsUuid!: string;
  customTagUuids!: string[];
  channelIds!: string[];

  build() {
    if (this.defaultAudioLanguage === undefined) this.defaultAudioLanguage = "";

    const properties: TypeormClassPropertyTuple[] = [
      ["ID", this.id],
      ["Kind", this.kind],
      ["E Tag", this.etag],
      ["Title", this.title],
      ["Description", this.description],
      ["Published At", this.publishedAt],
      ["Channel ID", this.channelId],
      ["Channel Title", this.channelTitle],
      ["Category ID", this.categoryId],
      ["YouTube Tags", this.youtubeTags],
      ["Default Audio Language", this.defaultAudioLanguage],
      ["Live Broadcast Content", this.liveBroadcastContent],
      ["Hidden", this.hidden],
      ["Stored", this.stored],
      ["Localized UUID", this.localizedUuid],
      ["Thumbnails UUID", this.thumbnailsUuid],
      ["Custom Tag UUIDs", this.customTagUuids],
      ["Channel IDs", this.channelIds],
    ];

    for (const [property, value] of properties) {
      if (value === undefined) throw new Error(`VideoSeed [${property}] is not defined.`);
    }

    return this;
  }

  buildFrom(payload: VideoBase) {
    const { id, kind, etag, title, description, publishedAt, channelId, channelTitle, categoryId, youtubeTags, liveBroadcastContent, hidden, stored, localized, thumbnails, customTags, channels } = payload;

    this.id = id;
    this.kind = kind;
    this.etag = etag;
    this.title = title;
    this.description = description;
    this.publishedAt = publishedAt;
    this.channelId = channelId;
    this.channelTitle = channelTitle;
    this.categoryId = categoryId;
    this.youtubeTags = youtubeTags ? [...youtubeTags] : [];
    this.liveBroadcastContent = liveBroadcastContent;
    this.hidden = hidden;
    this.stored = stored;
    this.localizedUuid = localized.uuid;
    this.thumbnailsUuid = thumbnails.uuid;
    this.customTagUuids = [...customTags].map((tag) => tag.uuid);
    this.channelIds = [...channels].map((tag) => tag.id);

    return this.build();
  }
}
