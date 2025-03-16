import { createError, defineEventHandler, readBody, setResponseStatus } from "#imports";
import { ChannelTypeorm } from "~/modules/music-tag-manager/v1/database/models";
import { ChannelRepository } from "~/modules/music-tag-manager/v1/database/repository";
import { ApiBodyChannel } from "~/modules/music-tag-manager/v1/types";
import { getBrandedCustomURL } from "~/modules/music-tag-manager/v1/utils/brand";
import { PropsPinoOptions } from "~/types/logger";
import { pinoLogger, pinoLoggerOptions } from "~/utils/logger";

export default defineEventHandler(async (event) => {
  const body = await readBody<ApiBodyChannel>(event);
  const yt_channel = body.channel;
  const { customUrl } = yt_channel.snippet;

  const loggerOptions: PropsPinoOptions = {
    title: "CREATE_CHANNEL",
    description: "Creating channel.",
    origin: "[server/api/music-tag-manager/v1/channels/index.post.ts]",
  };
  const logger = pinoLogger();
  const repository = new ChannelRepository();

  let channel: ChannelTypeorm = new ChannelTypeorm();
  let title: string = "";

  try {
    const search = await repository.listItemByCustomUrl$({
      customUrl: getBrandedCustomURL({ customUrl }),
    });

    if (search) {
      title = search.title;
      loggerOptions.description = `Channel [${title}] already exists.`;
    }

    if (!search) {
      const { description, localized } = yt_channel.snippet;
      yt_channel.snippet.description = description.replace(/\n/g, "[NL]");
      yt_channel.snippet.localized.description = localized.description.replace(/\n/g, "[NL]");

      const transformed = new ChannelTypeorm().buildFrom(yt_channel);

      channel = await repository.createItem$(transformed);
      title = channel.title;
      loggerOptions.description = `Channel [${title}] has been created.`;
    }

    logger.info(pinoLoggerOptions({ ...loggerOptions }));
  } catch (error) {
    const err = error as Error;

    logger.error(pinoLoggerOptions({ ...loggerOptions, description: err.message }));
    logger.error({ err }, loggerOptions.title);

    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error",
      message: err.message,
    });
  }

  setResponseStatus(event, 201, "Created");

  return channel;
});
