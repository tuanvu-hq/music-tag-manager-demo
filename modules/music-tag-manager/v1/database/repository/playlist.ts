import type { FindOptionsRelations } from "typeorm";
import type { BrandedUUID, RepositoryStrategyPlaylist, TypeormPagination } from "../../types";
import { queryBuilderVideoExactMatch, queryBuilderVideoLooseMatch } from "../../utils/typeorm";
import { AppDataSource } from "../datasource";
import * as Entities from "../models";

export class PlaylistRepository implements RepositoryStrategyPlaylist {
  repository;
  relations;

  constructor() {
    this.repository = AppDataSource.getRepository(Entities.PlaylistTypeorm);
    this.relations = {
      video: {
        localized: true,
        thumbnails: {
          default: true,
          medium: true,
          high: true,
          standard: true,
          maxres: true,
        },
        customTags: {
          tagCategory: true,
        },
        channels: true,
      },
    } satisfies FindOptionsRelations<Entities.PlaylistTypeorm>;
  }

  async paginateItems$({ pagination: { limit, page }, shuffling }: { shuffling: boolean; pagination: TypeormPagination }): Promise<{
    result: Entities.VideoTypeorm[];
    count: number;
  }> {
    const pagination = {
      limit: 100,
      page: 0,
    };

    if (limit && page) {
      pagination.limit = limit;
      pagination.page = page;
    }

    const [result, count] = await this.repository.findAndCount({
      relations: this.relations,
      order: shuffling ? { randomOrder: "ASC" } : { publishedAt: "DESC" },
      take: pagination.limit,
      skip: (pagination.page - 1) * pagination.limit,
    });
    const mapped = [...result].map((playlist) => playlist.video) as Entities.VideoTypeorm[];

    return { result: mapped, count };
  }

  async generateItems$({ tags, exactMatch }: { tags: BrandedUUID[]; exactMatch: boolean }): Promise<void> {
    const videoRepository = AppDataSource.getRepository(Entities.VideoTypeorm);
    const tagCategoryRepository = AppDataSource.getRepository(Entities.TagCategoryTypeorm);
    const queryBuilder = videoRepository.createQueryBuilder("video");

    await AppDataSource.query("TRUNCATE TABLE playlist;");

    if (exactMatch) {
      queryBuilderVideoExactMatch({ queryBuilder, tags });
    }

    if (!exactMatch) {
      const matchingVideoIdsSubquery = videoRepository.createQueryBuilder("subVideo");
      const tagCategoryBuilder = tagCategoryRepository.createQueryBuilder("tagCategory").leftJoin("tagCategory.tags", "tag").where("tag.uuid IN (:...tags)", { tags }).groupBy("tagCategory.uuid");
      const length = await tagCategoryBuilder.getCount();

      queryBuilderVideoLooseMatch({ queryBuilder, matchingVideoIdsSubquery, tags, length });
    }

    const result = await queryBuilder.getMany();
    let playlist = [...result].map((video) => new Entities.PlaylistTypeorm().setVideo(video).setPublishedAt(video.publishedAt).setRandomOrder(Math.random()).build());

    this.repository.save(playlist);
  }

  async deleteItems$(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
