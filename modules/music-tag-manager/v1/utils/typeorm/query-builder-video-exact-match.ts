import type { SelectQueryBuilder } from "typeorm";
import * as Entities from "../../database/models";
import type { BrandedUUID } from "../../types";

type Props = {
  queryBuilder: SelectQueryBuilder<Entities.VideoTypeorm>;
  tags: BrandedUUID[];
};

export const queryBuilderVideoExactMatch = ({ queryBuilder, tags }: Props) => {
  tags.forEach((tag, index) => {
    queryBuilder.innerJoin("video.customTags", `tag${index}`, `tag${index}.uuid = :tag${index}`, { [`tag${index}`]: tag });
  });

  queryBuilder.leftJoinAndSelect("video.localized", "localized");
  queryBuilder.leftJoinAndSelect("video.thumbnails", "thumbnails");
  queryBuilder.leftJoinAndSelect("thumbnails.default", "default");
  queryBuilder.leftJoinAndSelect("thumbnails.medium", "medium");
  queryBuilder.leftJoinAndSelect("thumbnails.high", "high");
  queryBuilder.leftJoinAndSelect("thumbnails.standard", "standard");
  queryBuilder.leftJoinAndSelect("thumbnails.maxres", "maxres");
  queryBuilder.leftJoinAndSelect("video.customTags", "customTags");
  queryBuilder.leftJoinAndSelect("customTags.tagCategory", "tagCategory");
  queryBuilder.leftJoinAndSelect("video.channels", "channels");

  queryBuilder.orderBy("video.publishedAt", "ASC");
};
