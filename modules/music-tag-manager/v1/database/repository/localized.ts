import type { BrandedUUID, RepositoryStrategyLocalized, TypeormPagination } from "../../types";
import { AppDataSource } from "../datasource";
import * as Entities from "../models";

export class LocalizedRepository implements RepositoryStrategyLocalized {
  repository;

  constructor() {
    this.repository = AppDataSource.getRepository(Entities.LocalizedTypeorm);
  }

  async paginateItems$({ limit, page }: TypeormPagination): Promise<{
    result: Entities.LocalizedTypeorm[];
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
      order: {
        title: "ASC",
      },
      take: pagination.limit,
      skip: (pagination.page - 1) * pagination.limit,
    });

    return { result, count };
  }

  async listItems$(): Promise<Entities.LocalizedTypeorm[]> {
    const list = await this.repository.find({});

    return list;
  }

  async getItem$(payload: BrandedUUID): Promise<Entities.LocalizedTypeorm | null> {
    const item = await this.repository.findOne({
      where: {
        uuid: payload,
      },
    });

    return item;
  }

  async createItem$(payload: Entities.LocalizedTypeorm): Promise<Entities.LocalizedTypeorm> {
    const { uuid, title } = payload;

    const searchByUuid = await this.repository.findOneBy({ uuid });
    if (searchByUuid) return searchByUuid;

    const searchByTitle = await this.repository.findOneBy({ title });
    if (searchByTitle) return searchByTitle;

    const item = await this.repository.save(payload);

    return item;
  }

  async updateItem$(payload: Entities.LocalizedTypeorm): Promise<Entities.LocalizedTypeorm> {
    const update = await this.repository.save({ ...payload });

    return update;
  }

  async deleteItem$(payload: BrandedUUID): Promise<void> {
    await this.repository.delete({ uuid: payload });
  }
}
