import axios from "axios";
import { ENV } from "../config/env.js";
import { Channel } from "../modules/channels/channels.model.js";
import { logger } from "../config/logger.js";

const CHANNELS_API = ENV.IPTV_BASE_URL + "/channels.json";

export const syncChannels = async () => {
  logger.info("Fetching channels...");

  const { data } = await axios.get(CHANNELS_API);

  const bulkOps = data.map((channel) => ({
    updateOne: {
      filter: { id: channel.id },
      update: {
        ...channel,
        launched: channel.launched ? new Date(channel.launched) : null,
        closed: channel.closed ? new Date(channel.closed) : null,
      },
      upsert: true,
    },
  }));

  await Channel.bulkWrite(bulkOps);

  logger.info(`Channels synced: ${bulkOps.length}`);
};
