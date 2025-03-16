import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { uuidGenerator } from "~/utils/uuid";
import type { TypeormClassPropertyTuple } from "../../types";
import { timezoneTransformer } from "../../utils/typeorm";
import { TagBase, TagTypeorm } from "./tag";

export class TagCategoryBase {
  @PrimaryColumn("uuid", { name: "uuid" })
  uuid!: string;
  @Column("text", { name: "title" })
  title!: string;
  @OneToMany(() => TagTypeorm, (tag) => tag.tagCategory, { cascade: ["insert", "update", "remove"] })
  @JoinColumn({ name: "tags" })
  tags!: TagBase[];

  setUuid(payload: string) {
    this.uuid = payload;

    return this;
  }

  setTitle(payload: string) {
    this.title = payload;

    return this;
  }

  setTags(payload: TagTypeorm[]) {
    this.tags = payload;

    return this;
  }

  build() {
    if (this.uuid === undefined) this.uuid = uuidGenerator();

    const properties: TypeormClassPropertyTuple[] = [
      ["UUID", this.uuid],
      ["Title", this.title],
      ["Tags", this.tags],
    ];

    for (const [property, value] of properties) {
      if (value === undefined) throw new Error(`TagCategory [${property}] is not defined.`);
    }

    return this;
  }
}

@Entity("tag_category")
export class TagCategoryTypeorm extends TagCategoryBase {
  @CreateDateColumn(timezoneTransformer({ name: "created_at" }))
  createdAt!: Date;
  @UpdateDateColumn(timezoneTransformer({ name: "updated_at" }))
  updatedAt!: Date;
}

export class TagCategorySeed {
  uuid!: string;
  title!: string;
  tagUuids!: string[];

  build() {
    const properties: TypeormClassPropertyTuple[] = [
      ["UUID", this.uuid],
      ["Title", this.title],
      ["Tag UUIDs", this.tagUuids],
    ];

    for (const [property, value] of properties) {
      if (value === undefined) throw new Error(`TagCategorySeed [${property}] is not defined.`);
    }

    return this;
  }

  buildFrom(payload: TagCategoryBase) {
    const { uuid, title, tags } = payload;

    this.uuid = uuid;
    this.title = title;
    this.tagUuids = [...tags].map((tag) => tag.uuid);

    return this.build();
  }
}
