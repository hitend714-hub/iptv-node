import mongoose from 'mongoose';
import { ENV } from './env.js';
import { logger } from './logger.js';

export const connectDB = async () => {
  try {
    await mongoose.connect(ENV.MONGO_URI);

    logger.info('MongoDB connected successfully');
  } catch (err) {
    logger.error(' MongoDB connection error:', err.message);
    // retry
    setTimeout(connectDB, 5000);
  }
};
