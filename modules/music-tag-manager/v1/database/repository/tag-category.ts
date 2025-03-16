import type { FindOptionsRelations } from "typeorm";
import type { BrandedTitle, BrandedUUID, RepositoryStrategyTagCategory, TypeormPagination } from "../../types";
import { AppDataSource } from "../datasource";

import * as Entities from "../models";

export class TagCategoryRepository implements RepositoryStrategyTagCategory {
  repository;
  relations;

  constructor() {
    this.repository = AppDataSource.getRepository(Entities.TagCategoryTypeorm);
    this.relations = {
      tags: true,
    } satisfies FindOptionsRelations<Entities.TagCategoryTypeorm>;
  }

  async paginateItems$({ limit, page }: TypeormPagination): Promise<{
    result: Entities.TagCategoryTypeorm[];
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
      order: {
        title: "ASC",
      },
      take: pagination.limit,
      skip: (pagination.page - 1) * pagination.limit,
    });

    return { result, count };
  }

  async listItems$(): Promise<Entities.TagCategoryTypeorm[]> {
    const list = await this.repository.find({
      relations: this.relations,
    });

    return list;
  }

  async getItem$(payload: BrandedUUID): Promise<Entities.TagCategoryTypeorm | null> {
    const item = await this.repository.findOne({
      where: {
        uuid: payload,
      },
      relations: this.relations,
    });

    return item;
  }

  async listItemByTitle$(payload: { title: BrandedTitle }): Promise<Entities.TagCategoryTypeorm | null> {
    const { title } = payload;

    const item = await this.repository.findOne({
      where: {
        title,
      },
      relations: this.relations,
    });

    return item;
  }

  async createItem$(payload: Entities.TagCategoryTypeorm): Promise<Entities.TagCategoryTypeorm> {
    const { uuid, title } = payload;

    const searchByUuid = await this.repository.findOneBy({ uuid });
    if (searchByUuid) return searchByUuid;

    const searchByTitle = await this.repository.findOneBy({ title });
    if (searchByTitle) return searchByTitle;

    const item = await this.repository.save(payload);

    return item;
  }

  async updateItem$(payload: Entities.TagCategoryTypeorm): Promise<Entities.TagCategoryTypeorm> {
    const update = await this.repository.save({ ...payload });

    return update;
  }

  async deleteItem$(payload: BrandedUUID): Promise<void> {
    await this.repository.delete({ uuid: payload });
  }
}
