import { type FindOptionsRelations } from "typeorm";
import { isoToYear } from "~/utils/format";
import type { BrandedID, RepositoryStrategyVideo } from "../../types";
import type { TypeormPagination } from "../../types/typeorm";
import { AppDataSource } from "../datasource";
import * as Entities from "../models";
import { ChannelRepository } from "./channel";
import { LocalizedRepository } from "./localized";
import { TagRepository } from "./tag";
import { TagCategoryRepository } from "./tag-category";
import { ThumbnailRepository } from "./thumbnail";
import { VideoThumbnailRepository } from "./video-thumbnail";

export class VideoRepository implements RepositoryStrategyVideo {
  repository;
  repositories;
  relations;

  constructor() {
    this.repository = AppDataSource.getRepository(Entities.VideoTypeorm);
    this.repositories = {
      tagCategory: new TagCategoryRepository(),
      tag: new TagRepository(),
      localized: new LocalizedRepository(),
      thumbnail: new ThumbnailRepository(),
      thumbnails: new VideoThumbnailRepository(),
      channel: new ChannelRepository(),
    };
    this.relations = {
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
    } satisfies FindOptionsRelations<Entities.VideoTypeorm>;
  }

  async paginateItems$({ limit, page }: TypeormPagination): Promise<{
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
      order: {
        publishedAt: "DESC",
      },
      take: pagination.limit,
      skip: (pagination.page - 1) * pagination.limit,
    });

    return { result, count };
  }

  async listItems$(): Promise<Entities.VideoTypeorm[]> {
    const list = await this.repository.find({
      relations: this.relations,
    });

    return list;
  }

  async getItem$(payload: BrandedID): Promise<Entities.VideoTypeorm | null> {
    const item = await this.repository.findOne({
      where: {
        id: payload,
      },
      relations: this.relations,
    });

    return item;
  }

  async createItem$(payload: Entities.VideoTypeorm): Promise<Entities.VideoTypeorm> {
    const { id, localized, thumbnails, channelTitle, customTags, publishedAt } = payload;
    const { default: _default, medium, high, standard, maxres } = thumbnails;
    const year = isoToYear({ iso: publishedAt });

    const search = await this.repository.findOneBy({ id });
    if (search) return search;

    const tagCategoryChannel = await this.repositories.tagCategory.createItem$(new Entities.TagCategoryTypeorm().setTitle("Channel").setTags([]).build());
    const tagCategoryYear = await this.repositories.tagCategory.createItem$(new Entities.TagCategoryTypeorm().setTitle("Year").setTags([]).build());

    const tagChannel = await this.repositories.tag.createItem$(new Entities.TagTypeorm().setTitle(channelTitle).setTagCategory(tagCategoryChannel).setVideos([]).build());
    const tagYear = await this.repositories.tag.createItem$(new Entities.TagTypeorm().setTitle(year).setTagCategory(tagCategoryYear).setVideos([]).build());

    payload.customTags = [...customTags, tagChannel, tagYear];

    await this.repositories.thumbnail.createItem$(_default as Entities.ThumbnailTypeorm);
    await this.repositories.thumbnail.createItem$(medium as Entities.ThumbnailTypeorm);
    await this.repositories.thumbnail.createItem$(high as Entities.ThumbnailTypeorm);
    if (standard) await this.repositories.thumbnail.createItem$(standard as Entities.ThumbnailTypeorm);
    if (maxres) await this.repositories.thumbnail.createItem$(maxres as Entities.ThumbnailTypeorm);

    await this.repositories.thumbnails.createItem$(thumbnails as Entities.VideoThumbnailTypeorm);
    await this.repositories.localized.createItem$(localized as Entities.LocalizedTypeorm);

    const item = await this.repository.save(payload);

    return item;
  }

  async createItemAndUpdateChannel$(payload: { channel: Entities.ChannelTypeorm; video: Entities.VideoTypeorm }): Promise<Entities.VideoTypeorm> {
    const { channel, video } = payload;
    const { id, localized, thumbnails, customTags, publishedAt } = video;
    const { default: _default, medium, high, standard, maxres } = thumbnails;
    const year = isoToYear({ iso: publishedAt });

    const search = await this.repository.findOneBy({ id });
    if (search) return search;

    const tagCategoryChannel = await this.repositories.tagCategory.createItem$(new Entities.TagCategoryTypeorm().setTitle("Channel").setTags([]).build());
    const tagCategoryYear = await this.repositories.tagCategory.createItem$(new Entities.TagCategoryTypeorm().setTitle("Year").setTags([]).build());

    const tagChannel = await this.repositories.tag.createItem$(new Entities.TagTypeorm().setTitle(channel.title).setTagCategory(tagCategoryChannel).setVideos([]).build());
    const tagYear = await this.repositories.tag.createItem$(new Entities.TagTypeorm().setTitle(year).setTagCategory(tagCategoryYear).setVideos([]).build());

    video.customTags = [...customTags, tagChannel, tagYear];

    await this.repositories.thumbnail.createItem$(_default as Entities.ThumbnailTypeorm);
    await this.repositories.thumbnail.createItem$(medium as Entities.ThumbnailTypeorm);
    await this.repositories.thumbnail.createItem$(high as Entities.ThumbnailTypeorm);
    if (standard) await this.repositories.thumbnail.createItem$(standard as Entities.ThumbnailTypeorm);
    if (maxres) await this.repositories.thumbnail.createItem$(maxres as Entities.ThumbnailTypeorm);

    await this.repositories.thumbnails.createItem$(thumbnails as Entities.VideoThumbnailTypeorm);
    await this.repositories.localized.createItem$(localized as Entities.LocalizedTypeorm);

    const item = await this.repository.save(video);

    const ids = new Set(channel.videos.map((video) => video.id));
    const _video = ids.has(id) ? [] : [video];

    channel.videos = [...channel.videos, ..._video];

    await this.repositories.channel.updateItem$(channel);

    return item;
  }

  async updateItem$(payload: Entities.VideoTypeorm): Promise<Entities.VideoTypeorm> {
    const update = await this.repository.save({ ...payload });

    return update;
  }

  async deleteItem$(payload: BrandedID): Promise<void> {
    await this.repository.delete({ id: payload });
  }
}
