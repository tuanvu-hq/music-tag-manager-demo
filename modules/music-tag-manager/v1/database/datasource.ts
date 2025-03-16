import { useRuntimeConfig } from "#imports"; // nitropack/runtime/internal/config
import { NodeFS } from "@electric-sql/pglite/nodefs";
import { DataSource, type DataSourceOptions } from "typeorm";
import { PGliteDriver } from "typeorm-pglite";
import * as Entities from "./models";

const entities = Object.values(Entities).filter((entity) => typeof entity === "function");

const runtimeConfig = useRuntimeConfig();

type PostgresType = "pglite" | "postgres";

export const local_pglite: DataSourceOptions = {
  driver: new PGliteDriver({
    fs: new NodeFS("./modules/music-tag-manager/v1/database/pglite"),
  }).driver,
  type: "postgres",
  entities: [...entities],
  synchronize: false,
  dropSchema: false,
  logging: false,
  migrations: [],
};

export const local_postgres: DataSourceOptions = {
  type: "postgres",
  entities: [...entities],
  host: runtimeConfig.postgres.host,
  port: +runtimeConfig.postgres.port,
  username: runtimeConfig.postgres.user,
  password: runtimeConfig.postgres.password,
  database: runtimeConfig.postgres.database,
  synchronize: false,
  dropSchema: false,
  logging: false,
  migrations: [],
  extra: {
    timezone: "Europe/Prague",
  },
};

const options: { [key in PostgresType]: DataSourceOptions } = {
  pglite: local_pglite,
  postgres: local_postgres,
};

export const AppDataSourceType: PostgresType = "pglite";

export const AppDataSourceOptions = options[AppDataSourceType];

export const AppDataSource = new DataSource(AppDataSourceOptions);
