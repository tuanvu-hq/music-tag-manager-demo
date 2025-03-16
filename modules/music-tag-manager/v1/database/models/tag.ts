import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { uuidGenerator } from "~/utils/uuid";
import type { TypeormClassPropertyTuple } from "../../types";
import { timezoneTransformer } from "../../utils/typeorm";
import { TagCategoryBase, TagCategoryTypeorm } from "./tag-category";
import { VideoBase, VideoTypeorm } from "./video";

export class TagBase {
  @PrimaryColumn("uuid", { name: "uuid" })
  uuid!: string;
  @Column("text", { name: "title" })
  title!: string;
  @ManyToOne(() => TagCategoryTypeorm, (tagCategory) => tagCategory.tags)
  @JoinColumn({ name: "tag_category" })
  tagCategory!: TagCategoryBase;
  @ManyToMany(() => VideoTypeorm, (video) => video.customTags)
  videos!: VideoBase[];

  setUuid(payload: string) {
    this.uuid = payload;

    return this;
  }

  setTitle(payload: string) {
    this.title = payload;

    return this;
  }

  setTagCategory(payload: TagCategoryBase) {
    this.tagCategory = payload;

    return this;
  }

  setVideos(payload: VideoTypeorm[]) {
    this.videos = payload;

    return this;
  }

  build() {
    if (this.uuid === undefined) this.uuid = uuidGenerator();

    const properties: TypeormClassPropertyTuple[] = [
      ["UUID", this.uuid],
      ["Title", this.title],
      ["Tag Category", this.tagCategory],
      ["Videos", this.videos],
    ];

    for (const [property, value] of properties) {
      if (value === undefined) throw new Error(`TagBase [${property}] is not defined.`);
    }

    return this;
  }
}

@Entity("tag")
export class TagTypeorm extends TagBase {
  @CreateDateColumn(timezoneTransformer({ name: "created_at" }))
  createdAt!: Date;
  @UpdateDateColumn(timezoneTransformer({ name: "updated_at" }))
  updatedAt!: Date;
}

export class TagSeed {
  uuid!: string;
  title!: string;
  tagCategoryUuid!: string;
  videoIds!: string[];

  build() {
    const properties: TypeormClassPropertyTuple[] = [
      ["UUID", this.uuid],
      ["Title", this.title],
      ["Tag Category UUID", this.tagCategoryUuid],
      ["Video IDs", this.videoIds],
    ];

    for (const [property, value] of properties) {
      if (value === undefined) throw new Error(`TagSeed [${property}] is not defined.`);
    }

    return this;
  }

  buildFrom(payload: TagBase) {
    const { uuid, title, tagCategory, videos } = payload;

    this.uuid = uuid;
    this.title = title;
    this.tagCategoryUuid = tagCategory.uuid;
    this.videoIds = [...videos].map((video) => video.id);

    return this.build();
  }
}
