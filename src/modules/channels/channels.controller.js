import ApiResponse from "../../utils/ApiResponse.js";
import catchAsync from "../../utils/catchAsync.js";
import { logger } from "../../config/logger.js";

import * as channelService from "./channels.service.js";

/**
 * Get Channels from stream url and parse them
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const getChannels = catchAsync(async (req, res) => {
  logger.info("getChannels called");

  const data = await channelService.getChannels();

  ApiResponse.success(res, 200, "Channels Retrieved Successfully", data);
});

/**
 * Get a list of channels based on the provided query parameters from the database
 * @param {*} req
 * @param {*} res
 * @return
 */
export const getChannelsList = catchAsync(async (req, res) => {
  logger.info("getChannelsList called");

  const data = await channelService.getChannelsList(req.query);

  ApiResponse.success(res, 200, "Channel List Retrieved Successfully", data);
});
