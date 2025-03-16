import type { SelectQueryBuilder } from "typeorm";
import * as Entities from "../../database/models";
import type { BrandedUUID } from "../../types";

type Props = {
  queryBuilder: SelectQueryBuilder<Entities.VideoTypeorm>;
  matchingVideoIdsSubquery: SelectQueryBuilder<Entities.VideoTypeorm>;
  tags: BrandedUUID[];
  length: number;
};

export const queryBuilderVideoLooseMatch = ({ queryBuilder, matchingVideoIdsSubquery, tags, length }: Props) => {
  queryBuilder.leftJoin("video.customTags", "tag").where("tag.uuid IN (:...tags)", { tags });

  matchingVideoIdsSubquery
    .leftJoin("subVideo.customTags", "subTag")
    .select("subVideo.id")
    .where("subTag.uuid IN (:...tags)", { tags })
    .groupBy("subVideo.id")
    .having("COUNT(DISTINCT subTag.uuid) = :tagCount", { tagCount: length >= 2 ? 2 : 1 });

  queryBuilder.andWhere(`video.id IN (${matchingVideoIdsSubquery.getQuery()})`);
  queryBuilder.setParameters(matchingVideoIdsSubquery.getParameters());

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
