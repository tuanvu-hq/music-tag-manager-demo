import type { TagCategoryBase } from "../models";

export class TagCategoryPublicDTO {
  uuid!: string;
  title!: string;

  build() {
    const properties = [
      ["UUID", this.uuid],
      ["Title", this.title],
    ];

    for (const [property, value] of properties) {
      if (value === undefined) throw new Error(`TagCategoryDTO [${property}] is not defined.`);
    }

    return this;
  }

  static buildFrom(payload: TagCategoryBase) {
    const { uuid, title } = payload;
    const instance = new TagCategoryPublicDTO();

    instance.uuid = uuid;
    instance.title = title;

    return instance.build();
  }
}
