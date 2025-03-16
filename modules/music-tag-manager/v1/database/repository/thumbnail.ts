import type { BrandedUUID, RepositoryStrategyThumbnail, TypeormPagination } from "../../types";
import { AppDataSource } from "../datasource";
import * as Entities from "../models";

export class ThumbnailRepository implements RepositoryStrategyThumbnail {
  repository;

  constructor() {
    this.repository = AppDataSource.getRepository(Entities.ThumbnailTypeorm);
  }

  async paginateItems$({ limit, page }: TypeormPagination): Promise<{
    result: Entities.ThumbnailTypeorm[];
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
      take: pagination.limit,
      skip: (pagination.page - 1) * pagination.limit,
    });

    return { result, count };
  }

  async listItems$(): Promise<Entities.ThumbnailTypeorm[]> {
    const list = await this.repository.find({});

    return list;
  }

  async getItem$(payload: BrandedUUID): Promise<Entities.ThumbnailTypeorm | null> {
    const item = await this.repository.findOne({
      where: {
        uuid: payload,
      },
    });

    return item;
  }

  async createItem$(payload: Entities.ThumbnailTypeorm): Promise<Entities.ThumbnailTypeorm> {
    const { uuid, url } = payload;

    const searchByUuid = await this.repository.findOneBy({ uuid });
    if (searchByUuid) return searchByUuid;

    const searchByUrl = await this.repository.findOneBy({ url });
    if (searchByUrl) return searchByUrl;

    const item = await this.repository.save(payload);

    return item;
  }

  async updateItem$(payload: Entities.ThumbnailTypeorm): Promise<Entities.ThumbnailTypeorm> {
    const update = await this.repository.save({ ...payload });

    return update;
  }

  async deleteItem$(payload: BrandedUUID): Promise<void> {
    await this.repository.delete({ uuid: payload });
  }
}
