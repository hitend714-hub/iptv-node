import { Router } from 'express';
import * as channelsController from './channels.controller.js';

const router = Router();

/**
 * Get Channels from stream url and parse them
 * Route: /api/channels from strem url
 */
router.get('/', channelsController.getChannels);

/**
 * Get a list of channels based on the provided query parameters from the database
 * Route: /api/channels/list
 */
router.get('/list', channelsController.getChannelsList);

export default router;
