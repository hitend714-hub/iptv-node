import app from "./app.js";
import { connectDB } from "./config/database.js";
import { ENV } from "./config/env.js";
import { logger } from "./config/logger.js";
import { syncChannels } from "./services/channel.sync.js";
// import "./jobs/channelSync.cron.js"; // moved to app.js to ensure DB is connected before syncing channels

/* ---------------------- 1. Connect to MongoDB ---------------------- */
await connectDB();
await syncChannels(); // initial sync on startup
/* ---------------------- 2. Start Cron AFTER DB ---------------------- */
await import("./jobs/channelSync.cron.js");

/* ---------------------- 3. Start Express Server ---------------------- */
const PORT = ENV.PORT || 5000;

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT} in ${ENV.NODE_ENV} mode`);
});

/* ---------------------- 4. Graceful Shutdown ---------------------- */
process.on("unhandledRejection", (err) => {
  logger.error("Unhandled Promise Rejection:", err);
  process.exit(1);
});
