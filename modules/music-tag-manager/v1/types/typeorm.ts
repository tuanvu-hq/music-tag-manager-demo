import type { ChannelCreateDTO, ChannelThumbnailCreateDTO, LocalizedCreateDTO, TagCategoryCreateDTO, TagCreateDTO, ThumbnailCreateDTO, VideoCreateDTO, VideoThumbnailCreateDTO } from "../database/dto";
import * as Entities from "../database/models";
import type { BrandedCustomURL, BrandedID, BrandedTitle, BrandedUUID } from "./brand";
import type { Color, Mode } from "./colors";

export interface PaginateItemsStrategy<Entity> {
  (payload: TypeormPagination): Promise<{ result: Entity[]; count: number }>;
}

export interface ListItemsStrategy<Entity> {
  listItems$(): Promise<Entity[]>;
}

export interface ListItemStrategy<Entity> {
  getItem$(payload: BrandedID | BrandedUUID): Promise<Entity | null>;
}

export interface CreateItemStrategy<Entity> {
  createItem$(payload: Entity): Promise<void>;
}

export interface UpdateItemStrategy<Entity> {
  updateItem$(payload: Entity): Promise<void>;
}

export interface DeleteItemStrategy {
  deleteItem$(payload: BrandedID | BrandedUUID): Promise<void>;
}

export interface RepositoryStrategy<Entity, EntityCreateDTO> {
  paginateItems$: PaginateItemsStrategy<Entity>;
  listItems$(): Promise<Entity[]>;
  getItem$(payload: BrandedID | BrandedUUID): Promise<Entity | null>;
  createItem$(payload: EntityCreateDTO): Promise<Entity>;
  updateItem$(payload: Entity): Promise<Entity>;
  deleteItem$(payload: BrandedID | BrandedUUID): Promise<void>;
}

export interface RepositoryStrategyChannelThumbnail extends RepositoryStrategy<Entities.ChannelThumbnailTypeorm, ChannelThumbnailCreateDTO> {}
export interface RepositoryStrategyLocalized extends RepositoryStrategy<Entities.LocalizedTypeorm, LocalizedCreateDTO> {}
export interface RepositoryStrategyThumbnail extends RepositoryStrategy<Entities.ThumbnailTypeorm, ThumbnailCreateDTO> {}
export interface RepositoryStrategyVideoThumbnail extends RepositoryStrategy<Entities.VideoThumbnailTypeorm, VideoThumbnailCreateDTO> {}

export interface RepositoryStrategyChannel extends RepositoryStrategy<Entities.ChannelTypeorm, ChannelCreateDTO> {
  listItemByCustomUrl$(payload: { customUrl: BrandedCustomURL }): Promise<Entities.ChannelTypeorm | null>;
}

export interface RepositoryStrategyPlaylist {
  paginateItems$(payload: { shuffling: boolean; pagination: TypeormPagination }): Promise<{ result: Entities.VideoTypeorm[]; count: number }>;
  generateItems$(payload: { tags: BrandedUUID[]; exactMatch: boolean; shuffling: boolean }): Promise<void>;
  deleteItems$(): Promise<void>;
}

export interface RepositoryStrategyTagCategory extends RepositoryStrategy<Entities.TagCategoryTypeorm, TagCategoryCreateDTO> {
  listItemByTitle$(payload: { title: BrandedTitle }): Promise<Entities.TagCategoryTypeorm | null>;
}

export interface RepositoryStrategyTag extends RepositoryStrategy<Entities.TagTypeorm, TagCreateDTO> {
  paginateItemsFilteredByTagCategory$(payload: { tagCategory: BrandedTitle; pagination: TypeormPagination }): Promise<{ result: Entities.TagTypeorm[]; count: number }>;
  listItemsByUuids$(payload: { tags: BrandedUUID[] }): Promise<Entities.TagTypeorm[]>;
  listItemByTitle$(payload: { title: BrandedTitle }): Promise<Entities.TagTypeorm | null>;
}

export interface RepositoryStrategyTheme {
  createItem$(payload: Entities.ThemeTypeorm): Promise<Entities.ThemeTypeorm>;
  getItem$(): Promise<Entities.ThemeTypeorm | null>;
  updateItem$(payload: { color?: Color; mode?: Mode }): Promise<void>;
}

export interface RepositoryStrategyVideo extends RepositoryStrategy<Entities.VideoTypeorm, VideoCreateDTO> {
  createItemAndUpdateChannel$(payload: { channel: Entities.ChannelTypeorm; video: Entities.VideoTypeorm }): Promise<Entities.VideoTypeorm>;
}

export type TypeormPagination = {
  limit?: number;
  page: number;
};

export type TypeormClassPropertyTuple = [string, any];
