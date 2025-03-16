import type { Color, Mode, RepositoryStrategyTheme } from "../../types";
import { AppDataSource } from "../datasource";
import * as Entities from "../models";

export class ThemeRepository implements RepositoryStrategyTheme {
  repository;

  constructor() {
    this.repository = AppDataSource.getRepository(Entities.ThemeTypeorm);
  }

  async createItem$(payload: Entities.ThemeTypeorm): Promise<Entities.ThemeTypeorm> {
    const { id } = payload;

    const searchById = await this.repository.findOneBy({ id });
    if (searchById) return searchById;

    const item = await this.repository.save(payload);

    return item;
  }

  async getItem$(): Promise<Entities.ThemeTypeorm | null> {
    const theme = await this.repository.findOne({
      where: {
        id: 1,
      },
    });

    return theme;
  }

  async updateItem$({ color, mode }: { color?: Color; mode?: Mode }): Promise<void> {
    const theme = await this.repository.findOne({
      where: {
        id: 1,
      },
    });

    await this.repository.save({ ...theme, color, mode });
  }
}
