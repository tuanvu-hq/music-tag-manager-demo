import { ILike, type FindOptionsRelations } from "typeorm";
import type { BrandedCustomURL, BrandedID, RepositoryStrategyChannel } from "../../types";
import type { TypeormPagination } from "../../types/typeorm";
import { AppDataSource } from "../datasource";

import * as Entities from "../models";
import { ChannelThumbnailRepository } from "./channel-thumbnail";
import { LocalizedRepository } from "./localized";
import { TagRepository } from "./tag";
import { TagCategoryRepository } from "./tag-category";
import { ThumbnailRepository } from "./thumbnail";

export class ChannelRepository implements RepositoryStrategyChannel {
  repository;
  repositories;
  relations;

  constructor() {
    this.repository = AppDataSource.getRepository(Entities.ChannelTypeorm);
    this.repositories = {
      tagCategory: new TagCategoryRepository(),
      tag: new TagRepository(),
      localized: new LocalizedRepository(),
      thumbnail: new ThumbnailRepository(),
      thumbnails: new ChannelThumbnailRepository(),
    };
    this.relations = {
      localized: true,
      thumbnails: {
        default: true,
        medium: true,
        high: true,
      },
      videos: true,
    } satisfies FindOptionsRelations<Entities.ChannelTypeorm>;
  }

  async paginateItems$({ limit, page }: TypeormPagination): Promise<{
    result: Entities.ChannelTypeorm[];
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

  async listItems$(): Promise<Entities.ChannelTypeorm[]> {
    const repository = AppDataSource.getRepository(Entities.ChannelTypeorm);
    const list = await repository.find({
      relations: this.relations,
    });

    return list;
  }

  async getItem$(payload: BrandedID): Promise<Entities.ChannelTypeorm | null> {
    const item = await this.repository.findOne({
      where: {
        id: payload,
      },
      relations: this.relations,
    });

    return item;
  }

  async listItemByCustomUrl$(payload: { customUrl: BrandedCustomURL }): Promise<Entities.ChannelTypeorm | null> {
    const { customUrl } = payload;
    const item = await this.repository.findOne({
      where: {
        customUrl: ILike(customUrl),
      },
      relations: this.relations,
    });

    return item;
  }

  async createItem$(payload: Entities.ChannelTypeorm): Promise<Entities.ChannelTypeorm> {
    const { id, localized, thumbnails, title } = payload;
    const { default: _default, medium, high } = thumbnails;

    const searchById = await this.repository.findOneBy({ id });
    if (searchById) return searchById;

    const searchByTitle = await this.repository.findOneBy({ title });
    if (searchByTitle) return searchByTitle;

    const tagCategory = await this.repositories.tagCategory.createItem$(new Entities.TagCategoryTypeorm().setTitle("Channel").setTags([]).build());

    await this.repositories.tag.createItem$(new Entities.TagTypeorm().setTitle(title).setTagCategory(tagCategory).setVideos([]).build());

    await this.repositories.thumbnail.createItem$(_default as Entities.ThumbnailTypeorm);
    await this.repositories.thumbnail.createItem$(medium as Entities.ThumbnailTypeorm);
    await this.repositories.thumbnail.createItem$(high as Entities.ThumbnailTypeorm);

    await this.repositories.thumbnails.createItem$(thumbnails as Entities.ChannelThumbnailTypeorm);
    await this.repositories.localized.createItem$(localized as Entities.LocalizedTypeorm);

    const item = await this.repository.save(payload);

    return item;
  }

  async updateItem$(payload: Entities.ChannelTypeorm): Promise<Entities.ChannelTypeorm> {
    const update = await this.repository.save({ ...payload });

    return update;
  }

  async deleteItem$(payload: BrandedID): Promise<void> {
    await this.repository.delete({ id: payload });
  }
}
