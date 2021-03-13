export const envConfig = {
  PUBLISHER_PORT: Number(process.env.PUBLISHER_PORT || 8001),
  SUBSCRIBER_PORT: Number(process.env.SUBSCRIBER_PORT || 9001),
};

const port = envConfig.SUBSCRIBER_PORT;

export const subscribersUrls = [
  `http://127.0.0.1:${port}/sub01`,
  `http://127.0.0.1:${port}/sub02`,
];
