import express from "express";
import channelsRoutes from "./channels/channels.routes.js";

const router = express.Router();

/**
 * Register all module routes here.
 * Each module should only handle its own routes.
 */
router.use("/v1/channels", channelsRoutes);

export default router;
