const isProd = process.env.PROD == "true";

module.exports = {
  host: process.env.REDIS_HOST,
  port: 6379,
  ...(isProd && {
    tls: {},
  }),
  retryStrategy: (times) => Math.min(times * 50, 2000),
  connectTimeout: 10000,
  maxRetriesPerRequest: 3,
  enableReadyCheck: true,
};
