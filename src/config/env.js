import dotenv from 'dotenv';
dotenv.config();

export const ENV = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT, 10) || 5000,
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/iptv-node',
  IPTV_BASE_URL: process.env.IPTV_BASE_URL || 'https://iptv-org.github.io/api',
  IPTV_STREAM_URL: process.env.IPTV_STREAM_URL || 'https://iptv-org.github.io/iptv/index.m3u',

  // api
  API_SECRET_KEY: process.env.API_SECRET_KEY || 'my_super_secret_key_123',
};
