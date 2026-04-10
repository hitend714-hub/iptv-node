import axios from "axios";
import { Channel } from "./channels.model.js";
import { ENV } from "../../config/env.js";

/**
 * Get Channels from stream url and parse them
 * @returns
 */
export const getChannels = async () => {
  const response = await axios.get(ENV.IPTV_STREAM_URL);

  const lines = response.data.split("\n");

  const channels = [];
  let currentChannel = {};

  for (let line of lines) {
    line = line.trim();

    if (line.startsWith("#EXTINF")) {
      const nameMatch = line.match(/,(.*)$/);
      const logoMatch = line.match(/tvg-logo="(.*?)"/);
      const groupMatch = line.match(/group-title="(.*?)"/);

      currentChannel = {
        name: nameMatch ? nameMatch[1] : "",
        logo: logoMatch ? logoMatch[1] : "",
        group: groupMatch ? groupMatch[1] : "",
      };
    } else if (line && !line.startsWith("#")) {
      currentChannel.url = line;
      channels.push(currentChannel);
      currentChannel = {};
    }
  }

  return channels;
};

/**
 * Get a list of channels based on the provided query parameters from the database
 * @param {*} query
 * @returns
 */
export const getChannelsList = async (query) => {
  const { page = 1, limit = 20, search, country, category } = query;

  const filter = {};

  //  Search by name
  if (search) {
    filter.name = { $regex: search, $options: "i" };
  }

  // Filter by country
  if (country) {
    filter.country = country;
  }

  // Filter by category
  if (category) {
    filter.category = category;
  }

  // Only active channels
  filter.closed = null;

  const skip = (page - 1) * limit;

  const [channels, total] = await Promise.all([
    Channel.find(filter).skip(skip).limit(Number(limit)).sort({ name: 1 }),

    Channel.countDocuments(filter),
  ]);

  return {
    channels: channels,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / limit),
    },
  };
};
