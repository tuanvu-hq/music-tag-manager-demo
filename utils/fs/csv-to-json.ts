import csvtojson from "csvtojson";
import path from "path";
import type { PropsPinoOptions } from "~/types/logger";
import { pinoLogger, pinoLoggerOptions } from "../logger";
import { checkFileAvailability } from "./check-file-availability";

type Props = {
  filepath: string;
};

export const csvToJson$ = async <T>({ filepath }: Props) => {
  const filename = path.basename(filepath);

  const loggerOptions: PropsPinoOptions = {
    title: "CSV_TO_JSON",
    description: `File [${filename}] read was successfull.`,
    origin: "[utils/fs/csv-to-json.ts]",
  };
  const logger = pinoLogger();

  let result: T[] = [];

  try {
    checkFileAvailability({ filepath });

    result = (await csvtojson().fromFile(filepath)) as T[];

    logger.info(pinoLoggerOptions({ ...loggerOptions }));
  } catch (error) {
    const err = error as Error;

    logger.error(pinoLoggerOptions({ ...loggerOptions, description: err.message }));
    logger.error({ err }, loggerOptions.title);
  }

  return result;
};
