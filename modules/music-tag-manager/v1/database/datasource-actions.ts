import fs from "fs";
import type { QueryRunner } from "typeorm";
import { createDatabase } from "typeorm-extension";
import type { PropsPinoOptions } from "~/types/logger";
import { pinoLogger, pinoLoggerOptions } from "~/utils/logger";
import { AppDataSource, AppDataSourceOptions } from "./datasource";
import * as Entities from "./models";

const loggerOptions: PropsPinoOptions = {
  title: "DATASOURCE_ACTION",
  description: "Handling datasource actions.",
  origin: "[modules/music-tag-manager/v1/database/datasource-actions.ts]",
};
const logger = pinoLogger();

export const createDB$ = async () => {
  await createDatabase({
    options: AppDataSourceOptions,
    ifNotExist: true,
  });
};

export const setupDB$ = async () => {
  if (!AppDataSource.isInitialized) await startDS$();

  if (process.env.NODE_ENV !== "production") {
    const table = await AppDataSource.query(`SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'channel');`);
    const exists = table && table[0] && table[0].exists;

    if (exists) {
      loggerOptions.description = "Table 'channel' exists.";
      logger.info(pinoLoggerOptions({ ...loggerOptions }));

      const hasRows = await AppDataSource.getRepository(Entities.ChannelTypeorm)
        .createQueryBuilder("entity")
        .select("COUNT(*)", "count")
        .getRawOne()
        .then((result: any) => parseInt(result.count) > 0);

      if (hasRows) {
        loggerOptions.description = "Table 'channel' exists. Data exist. Proceeding.";
        logger.info(pinoLoggerOptions({ ...loggerOptions }));

        await AppDataSource.synchronize();
      }

      if (!hasRows) {
        loggerOptions.description = "Table 'channel' exists. Data don't exist. Re-creating database.";
        logger.info(pinoLoggerOptions({ ...loggerOptions }));

        await generateDatabase$();
      }
    }

    if (!exists) {
      loggerOptions.description = "Table 'channel' doesn't exist. Generating tables & inserting data. (Might take a while.)";
      logger.info(pinoLoggerOptions({ ...loggerOptions }));

      await generateDatabase$();
    }
  }
};

export const startDS$ = async () => {
  if (AppDataSource.isInitialized) return;

  await AppDataSource.initialize();
};

export const endDS$ = async () => {
  if (!AppDataSource.isInitialized) return;

  await AppDataSource.destroy();
};

export const startQueryRunner$ = async () => {
  if (!AppDataSource.isInitialized) await startDS$();

  return AppDataSource.createQueryRunner();
};

export const endQueryRunner$ = async ({ queryRunner }: { queryRunner: QueryRunner }) => {
  if (queryRunner && !queryRunner.isReleased) {
    await queryRunner.release();
  }
};

const generateDatabase$ = async () => {
  await AppDataSource.dropDatabase();

  const path = "./modules/music-tag-manager/v1/database/backup/mtm-backup.sql";
  let script = fs.readFileSync(path, "utf8");

  const statements: string[] = [];
  let currentStatement = "";
  script.split("\n").forEach((line) => {
    line = line.trim();

    if (line && !line.startsWith("--")) {
      currentStatement += " " + line;

      if (line.endsWith(";")) {
        statements.push(currentStatement.trim());
        currentStatement = "";
      }
    }
  });

  for (const statement of statements) {
    if (statement.match(/^\s*SET\s+/i)) return;

    await AppDataSource.query(statement);
  }
};
