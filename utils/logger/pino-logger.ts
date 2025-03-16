import pino from "pino";
import type { PropsPinoOptions } from "~/types/logger";

export const pinoLogger = () => {
  return pino({
    level: process.env.LOG_LEVEL || "debug",
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
      },
    },
  });
};

export const pinoLoggerOptions = ({ title, description, origin }: PropsPinoOptions) => {
  return { origin, description, msg: title };
};
