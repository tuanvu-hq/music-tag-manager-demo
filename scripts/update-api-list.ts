import fs from "fs";
import { join } from "path";
import pino from "pino";
import type { RootApiBlock } from "../types/root";

type ReadProps = {
  filepath: string;
  type: string;
  path?: string;
};

type WriteProps = {
  filepath: string;
};

type PropsPinoOptions = {
  title: string;
  description: string;
  origin: string;
};

const loggerOptions: PropsPinoOptions = {
  title: "UPDATE_API_LIST",
  description: "Updating the API list.",
  origin: "[scripts/update-index-file.ts]",
};
const logger = pino({
  level: process.env.LOG_LEVEL || "debug",
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
});
const pinoLoggerOptions = ({ title, description, origin }: PropsPinoOptions) => {
  return { origin, description, msg: title };
};

const list: RootApiBlock[] = [];

const readDirectory = ({ filepath, type, path = "" }: ReadProps) => {
  const files = fs.readdirSync(filepath);

  for (const file of files) {
    const fullpath = join(filepath, file);
    const stats = fs.statSync(fullpath);

    if (stats.isDirectory()) {
      const character = file.charAt(0).toUpperCase();
      const nextType = type === "0" ? character : type;
      const nextPath = path ? `${path}/${file}` : file;

      readDirectory({ filepath: fullpath, type: nextType, path: nextPath });
    } else if (stats.isFile()) {
      // Remove ".js" / ".ts".
      // From: "test.ts" To: "test"
      // From: "test.get.ts" To: "test.get"
      const filename = file.split(".").slice(0, -1).join(".");
      let method = "GET";

      // Checkpoint for files with extension.
      let parts = splitFilename({ filename });
      if (parts.length > 1) {
        const ext = parts[parts.length - 1].toUpperCase();

        if (["GET", "POST", "PUT", "DELETE", "PATCH"].includes(ext)) {
          method = ext;
          parts = [...parts].slice(0, -1);
        }
      }

      let endpoint = parts[0];
      // Handle index.ts || index.[METHOD].ts files.
      if (endpoint === "index") {
        endpoint = "";
      }

      let group = list.find((group) => group.type === type);
      if (!group) {
        group = { type, items: [] };

        list.push(group);
      }

      const url = `api${path ? `/${path}` : ``}${endpoint ? `/${endpoint}` : ``}`;
      group.items.push({ url, method });
    }
  }
};

const splitFilename = ({ filename }: { filename: string }) => {
  const dynamic = filename.includes("[...]");
  const slug = filename.includes("[...slug]");

  if (dynamic) {
    const A = "[...]";
    const B = "[TEMP]";

    return filename
      .replace(A, B)
      .split(".")
      .map((item) => item.replace(B, A));
  }

  if (slug) {
    const A = "[...slug]";
    const B = "[TEMP]";

    return filename
      .replace(A, B)
      .split(".")
      .map((item) => item.replace(B, A));
  }

  return filename.split(".");
};

const writeJson = ({ filepath }: WriteProps) => {
  fs.writeFileSync(filepath, JSON.stringify(list, null, 2));
};

const run = () => {
  try {
    readDirectory({ filepath: "./server/api", type: "0" });
    writeJson({ filepath: "./configuration/root/api-list.json" });

    logger.info(pinoLoggerOptions({ ...loggerOptions }));
  } catch (error) {
    const err = error as Error;

    logger.error(pinoLoggerOptions({ ...loggerOptions, description: err.message }));
    logger.error({ err }, loggerOptions.title);
  }
};

run();
