import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { uuidGenerator } from "~/utils/uuid";
import type { TypeormClassPropertyTuple, YoutubeLocalized } from "../../types";
import { timezoneTransformer } from "../../utils/typeorm";

export class LocalizedBase {
  @PrimaryColumn("uuid", { name: "uuid" })
  uuid!: string;
  @Column("text", { name: "title" })
  title!: string;
  @Column("text", { name: "description" })
  description!: string;

  setUuid(payload: string) {
    this.uuid = payload;

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

  build() {
    if (this.uuid === undefined) this.uuid = uuidGenerator();

    const properties: TypeormClassPropertyTuple[] = [
      ["UUID", this.uuid],
      ["Title", this.title],
      ["Description", this.description],
    ];

    for (const [property, value] of properties) {
      if (value === undefined) throw new Error(`LocalizedBase [${property}] is not defined.`);
    }

    return this;
  }
}

@Entity("localized")
export class LocalizedTypeorm extends LocalizedBase {
  @CreateDateColumn(timezoneTransformer({ name: "created_at" }))
  createdAt!: Date;
  @UpdateDateColumn(timezoneTransformer({ name: "updated_at" }))
  updatedAt!: Date;

  buildFrom(payload: YoutubeLocalized) {
    const { title, description } = payload;

    // prettier-ignore
    return new LocalizedTypeorm()
    .setTitle(title)
    .setDescription(description)
    .build();
  }
}

export class LocalizedSeed {
  uuid!: string;
  title!: string;
  description!: string;

  build() {
    const properties: TypeormClassPropertyTuple[] = [
      ["UUID", this.uuid],
      ["Title", this.title],
      ["Description", this.description],
    ];

    for (const [property, value] of properties) {
      if (value === undefined) throw new Error(`LocalizedSeed [${property} is not defined.`);
    }

    return this;
  }

  buildFrom(payload: LocalizedBase) {
    this.uuid = payload.uuid;
    this.title = payload.title;
    this.description = payload.description;

    return this.build();
  }
}
