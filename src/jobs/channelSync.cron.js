import cron from "node-cron";
import { logger } from "../config/logger.js";
import { syncChannels } from "../services/channel.sync.js";

// every 6 hours
cron.schedule("0 */6 * * *", async () => {
  logger.info("Cron: syncing channels...");
  await syncChannels();
});
