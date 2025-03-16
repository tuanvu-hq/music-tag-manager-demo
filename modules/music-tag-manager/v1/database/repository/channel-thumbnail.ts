import type { BrandedUUID, RepositoryStrategyChannelThumbnail, TypeormPagination } from "../../types";
import { getBrandedUUID } from "../../utils/brand";
import { AppDataSource } from "../datasource";
import * as Entities from "../models";
import { ThumbnailRepository } from "./thumbnail";

export class ChannelThumbnailRepository implements RepositoryStrategyChannelThumbnail {
  repository;
  repositories;

  constructor() {
    this.repository = AppDataSource.getRepository(Entities.ChannelThumbnailTypeorm);
    this.repositories = {
      thumbnail: new ThumbnailRepository(),
    };
  }

  async paginateItems$({ limit, page }: TypeormPagination): Promise<{
    result: Entities.ChannelThumbnailTypeorm[];
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

  async listItems$(): Promise<Entities.ChannelThumbnailTypeorm[]> {
    const list = await this.repository.find({});

    return list;
  }

  async getItem$(payload: BrandedUUID): Promise<Entities.ChannelThumbnailTypeorm | null> {
    const item = await this.repository.findOne({
      where: {
        uuid: payload,
      },
    });

    return item;
  }

  async createItem$(payload: Entities.ChannelThumbnailTypeorm): Promise<Entities.ChannelThumbnailTypeorm> {
    const { uuid } = payload;

    const searchByUuid = await this.repository.findOneBy({ uuid });
    if (searchByUuid) {
      const _default = await this.repositories.thumbnail.getItem$(getBrandedUUID({ uuid: searchByUuid.default.uuid }));
      const medium = await this.repositories.thumbnail.getItem$(getBrandedUUID({ uuid: searchByUuid.medium.uuid }));
      const high = await this.repositories.thumbnail.getItem$(getBrandedUUID({ uuid: searchByUuid.high.uuid }));

      if (_default && medium && high) return searchByUuid;
    }

    const item = await this.repository.save(payload);

    return item;
  }

  async updateItem$(payload: Entities.ChannelThumbnailTypeorm): Promise<Entities.ChannelThumbnailTypeorm> {
    const update = await this.repository.save({ ...payload });

    return update;
  }

  async deleteItem$(payload: BrandedUUID): Promise<void> {
    await this.repository.delete({ uuid: payload });
  }
}
