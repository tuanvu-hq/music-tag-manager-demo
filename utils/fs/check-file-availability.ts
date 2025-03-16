import fs from "fs";
import path from "path";
import type { PropsPinoOptions } from "~/types/logger";
import { pinoLogger, pinoLoggerOptions } from "../logger";

type Props = {
  filepath: string;
};

export const checkFileAvailability = ({ filepath }: Props) => {
  const directory = path.dirname(filepath);

  const loggerOptions: PropsPinoOptions = {
    title: "CHECK_FILE_AVAILABILITY",
    description: `File [${filepath}] rewrite was successfull.`,
    origin: "[utils/fs/check-file-availability.ts]",
  };
  const logger = pinoLogger();

  try {
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }

    if (!fs.existsSync(filepath)) {
      fs.writeFileSync(filepath, "");
    }

    logger.info(pinoLoggerOptions({ ...loggerOptions }));
  } catch (error) {
    const err = error as Error;

    logger.error(pinoLoggerOptions({ ...loggerOptions, description: err.message }));
    logger.error({ err }, loggerOptions.title);
  }
};
