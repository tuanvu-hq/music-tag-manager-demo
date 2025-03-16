import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { uuidGenerator } from "~/utils/uuid";
import type { TypeormClassPropertyTuple } from "../../types";
import { timezoneTransformer } from "../../utils/typeorm";
import { VideoBase, VideoTypeorm } from "./video";

@Entity("playlist")
export class PlaylistTypeorm {
  @PrimaryColumn("uuid", { name: "uuid" })
  uuid!: string;
  @OneToOne(() => VideoTypeorm, (video) => video.id, { cascade: false })
  @JoinColumn({ name: "video" })
  video!: VideoBase;
  @Column("text", { name: "published_at" })
  publishedAt!: string;
  @Column("float", { name: "random_order" })
  randomOrder!: number;
  @CreateDateColumn(timezoneTransformer({ name: "created_at" }))
  createdAt!: Date;
  @UpdateDateColumn(timezoneTransformer({ name: "updated_at" }))
  updatedAt!: Date;

  setUuid(payload: string) {
    this.uuid = payload;

    return this;
  }

  setVideo(payload: VideoTypeorm) {
    this.video = payload;

    return this;
  }

  setPublishedAt(payload: string) {
    this.publishedAt = payload;

    return this;
  }

  setRandomOrder(payload: number) {
    this.randomOrder = payload;

    return this;
  }

  build() {
    if (!this.uuid) this.uuid = uuidGenerator();

    const properties: TypeormClassPropertyTuple[] = [
      ["UUID", this.uuid],
      ["Video", this.video],
      ["Published At", this.publishedAt],
      ["Random Order", this.randomOrder],
    ];

    for (const [property, value] of properties) {
      if (value === undefined) throw new Error(`Playlist [${property}] is not defined.`);
    }

    return this;
  }
}
