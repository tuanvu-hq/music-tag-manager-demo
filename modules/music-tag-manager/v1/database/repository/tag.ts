import { In, type FindOptionsRelations } from "typeorm";
import type { BrandedTitle, BrandedUUID, RepositoryStrategyTag, TypeormPagination } from "../../types";
import { AppDataSource } from "../datasource";
import * as Entities from "../models";

export class TagRepository implements RepositoryStrategyTag {
  repository;
  relations;

  constructor() {
    this.repository = AppDataSource.getRepository(Entities.TagTypeorm);
    this.relations = {
      tagCategory: true,
      videos: true,
    } satisfies FindOptionsRelations<Entities.TagTypeorm>;
  }

  async paginateItems$({ limit, page }: TypeormPagination): Promise<{
    result: Entities.TagTypeorm[];
    count: number;
  }> {
    const pagination = {
      limit: 0,
      page: 0,
    };

    if (limit && page) {
      pagination.limit = limit;
      pagination.page = page;
    }

    const [result, count] = await this.repository.findAndCount({
      relations: this.relations,
      order: {
        title: "ASC",
      },
      take: pagination.limit,
      skip: (pagination.page - 1) * pagination.limit,
    });

    return { result, count };
  }

  async paginateItemsFilteredByTagCategory$(payload: { tagCategory: BrandedTitle; pagination: TypeormPagination }): Promise<{ result: Entities.TagTypeorm[]; count: number }> {
    const pagination = {
      limit: 100,
      page: 0,
    };
    const {
      tagCategory,
      pagination: { limit, page },
    } = payload;

    if (limit && page) {
      pagination.limit = limit;
      pagination.page = page;
    }

    const [result, count] = await this.repository.findAndCount({
      relations: this.relations,
      where: {
        tagCategory: {
          title: tagCategory,
        },
      },
      order: {
        title: "ASC",
      },
      take: pagination.limit,
      skip: (pagination.page - 1) * pagination.limit,
    });

    return { result, count };
  }

  async listItems$(): Promise<Entities.TagTypeorm[]> {
    const list = await this.repository.find({
      relations: {
        tagCategory: true,
        videos: true,
      },
    });

    return list;
  }

  async listItemsByUuids$(payload: { tags: BrandedUUID[] }): Promise<Entities.TagTypeorm[]> {
    const { tags } = payload;
    const list = await this.repository.find({
      relations: {
        tagCategory: true,
        videos: true,
      },
      where: {
        uuid: In(tags),
      },
    });

    return list;
  }

  async getItem$(payload: BrandedUUID): Promise<Entities.TagTypeorm | null> {
    const item = await this.repository.findOne({
      where: {
        uuid: payload,
      },
    });

    return item;
  }

  async listItemByTitle$(payload: { title: BrandedTitle }): Promise<Entities.TagTypeorm | null> {
    const { title } = payload;

    const item = await this.repository.findOne({
      where: {
        title,
      },
    });

    return item;
  }

  async createItem$(payload: Entities.TagTypeorm): Promise<Entities.TagTypeorm> {
    const { uuid, title } = payload;

    const searchByUuid = await this.repository.findOneBy({ uuid });
    if (searchByUuid) return searchByUuid;

    const searchByTitle = await this.repository.findOneBy({ title });
    if (searchByTitle) return searchByTitle;

    const item = await this.repository.save(payload);

    return item;
  }

  async updateItem$(payload: Entities.TagTypeorm): Promise<Entities.TagTypeorm> {
    const update = await this.repository.save({ ...payload });

    return update;
  }

  async deleteItem$(payload: BrandedUUID): Promise<void> {
    await this.repository.delete({ uuid: payload });
  }
}
