import type { TypeormClassPropertyTuple } from "../../types";
import type { TagBase } from "../models";
import { TagCategoryPublicDTO } from "./tag-category-public-dto";

export class TagPublicDTO {
  uuid!: string;
  title!: string;
  tagCategory!: TagCategoryPublicDTO;

  build() {
    const properties: TypeormClassPropertyTuple[] = [
      ["UUID", this.uuid],
      ["Title", this.title],
      ["Tag category ", this.tagCategory],
    ];

    for (const [property, value] of properties) {
      if (value === undefined) throw new Error(`TagPublicDTO [${property}] is not defined.`);
    }

    return this;
  }

  static buildFrom(payload: TagBase) {
    const { uuid, title, tagCategory } = payload;
    const instance = new TagPublicDTO();

    instance.uuid = uuid;
    instance.title = title;
    instance.tagCategory = TagCategoryPublicDTO.buildFrom(tagCategory);

    return instance.build();
  }
}
