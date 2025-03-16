import fs from "fs";
import path from "path";
import pino from "pino";

type Props = {
  filepath: string;
};

type PropsPinoOptions = {
  title: string;
  description: string;
  origin: string;
};

const loggerOptions: PropsPinoOptions = {
  title: "UPDATE_INDEX_FILE",
  description: "Updating the index files.",
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

export const updateIndexFile = ({ filepath }: Props) => {
  if (!fs.existsSync(filepath)) return;

  const files = fs.readdirSync(filepath);

  for (const file of files) {
    const fullpath = path.join(filepath, file);
    const stats = fs.statSync(fullpath);

    if (stats.isDirectory()) {
      updateIndexFile({ filepath: fullpath });
    } else if (file === "index.ts" || file === "index.js") {
      processIndexFile({ filepath: fullpath });
    }
  }
};

const processIndexFile = ({ filepath }: Props) => {
  const dir = path.dirname(filepath);
  const files = fs.readdirSync(dir);
  const exports = [];

  for (const file of files) {
    const fullpath = path.join(dir, file);
    const stats = fs.statSync(fullpath);

    // Skip directories and hidden files.
    if (!stats.isDirectory() && !file.startsWith(".")) {
      const ext = path.extname(file);
      const basename = path.basename(file, ext);

      if (file !== "index.ts" && file !== "index.js") {
        if (ext === ".vue" || ext === ".jsx" || ext === ".tsx") {
          exports.push(`export { default as ${basename} } from './${file}';`);
        } else if (ext === ".js" || ext === ".ts") {
          exports.push(`export * from './${basename}';`);
        } else if (ext === ".json") {
          const exportName = basename.toUpperCase().replace(/-/g, "_");

          exports.push(`export { default as ${exportName} } from './${file}';`);
        }
      }
    }
  }

  const exported = exports.length > 0 ? exports.join("\n") : "";
  const existing = fs.readFileSync(filepath, "utf8");
  const description = `Index file [${filepath}] has been modified.`;

  if (existing !== exported) {
    fs.writeFileSync(filepath, exported, "utf8");

    logger.info(pinoLoggerOptions({ ...loggerOptions }));
  }
};

const run = () => {
  try {
    updateIndexFile({ filepath: "./components" });
    updateIndexFile({ filepath: "./constants" });
    updateIndexFile({ filepath: "./composables" });
    updateIndexFile({ filepath: "./configuration" });
    updateIndexFile({ filepath: "./middleware" });
    updateIndexFile({ filepath: "./modules" });
    updateIndexFile({ filepath: "./plugins" });
    updateIndexFile({ filepath: "./scripts" });
    updateIndexFile({ filepath: "./stores" });
    updateIndexFile({ filepath: "./types" });
    updateIndexFile({ filepath: "./utils" });

    logger.info(pinoLoggerOptions({ ...loggerOptions }));
  } catch (error) {
    const err = error as Error;

    logger.error(pinoLoggerOptions({ ...loggerOptions, description: err.message }));
    logger.error({ err }, loggerOptions.title);
  }
};

run();
