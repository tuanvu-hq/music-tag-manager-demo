import { Parser } from "@json2csv/plainjs";
import { flatten } from "@json2csv/transforms";
import fs from "fs";
import path from "path";
import type { PropsPinoOptions } from "~/types/logger";
import { pinoLogger, pinoLoggerOptions } from "../logger";
import { checkFileAvailability } from "./check-file-availability";

type Props = {
  data: any[];
  filepath: string;
};

export const jsonToCsv = ({ data, filepath }: Props) => {
  const filename = path.basename(filepath);
  const parser = new Parser({
    transforms: [flatten({ objects: true })],
  });

  const loggerOptions: PropsPinoOptions = {
    title: "JSON_TO_CSV",
    description: `File [${filename}] rewrite was successfull.`,
    origin: "[utils/fs/json-to-csv.ts]",
  };

  const logger = pinoLogger();

  try {
    if (data.length === 0) {
      throw new Error("[data] is empty.");
    }

    checkFileAvailability({ filepath });

    const csv = parser.parse(data);

    fs.writeFileSync(filepath, csv);

    logger.info(pinoLoggerOptions({ ...loggerOptions }));
  } catch (error) {
    const err = error as Error;

    logger.error(pinoLoggerOptions({ ...loggerOptions, description: err.message }));
    logger.error({ err }, loggerOptions.title);
  }
};
