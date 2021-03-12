import cors from "cors";
import express from "express";
import helmet from "helmet";
import axios from "axios";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

const subscriptions = new Map<string, string[]>();
const subscriberPort = process.env.SUBSCRIBER_PORT || 9001;

export enum StatusCode {
  OK_200 = 200,
  Accepted_202 = 202,
  Created_201 = 201,
  InternalServerError_500 = 500,
  NotFound_404 = 404,
  Forbidden_403 = 403,
  Unauthorized_401 = 401,
  BadRequest_400 = 400,
  MethodNotAllowed_405 = 405,
}

const subscribersUrls = [
  `http://127.0.0.1:${subscriberPort}/test1`,
  `http://127.0.0.1:${subscriberPort}/test2`,
];

async function publishToSubscribers({
  url,
  topic,
  data,
}: {
  url: string;
  topic: string;
  data: Record<string, any>;
}) {
  try {
    const body = { topic, data };
    // console.log({ body, url });
    await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    });
  } catch (error) {
    console.error(error);
  }
}

app.post("/subscribe/:topic", (req, res) => {
  const topic: string = req.params.topic.toLowerCase();
  const url: string = req.body.url;

  // console.log({ topic, url });

  if (!(url && typeof url === "string")) {
    return res.status(400).send({
      message: `[publisher] body.url is required and must be a valid string`,
    });
  }

  if (!subscribersUrls.includes(url)) {
    const urls = subscribersUrls.join(", ");
    return res.status(400).send({
      message: `[publisher] ${url} is not part of urls available for subscription: ${urls}`,
    });
  }

  const urls = subscriptions.get(topic) || [];
  subscriptions.set(topic, [...urls, url]);

  res.json({ topic, url });
});

app.post("/publish/:topic", async (req, res) => {
  const topic = req.params.topic.toLowerCase();
  const data: Record<string, any> = req.body;

  if (data && typeof data === "object") {
    if (subscriptions.has(topic)) {
      const subUrls = subscriptions.get(topic) || [];
      for (const url of subUrls) {
        await publishToSubscribers({ topic, data, url });
      }
      res.json({ message: "[publisher] Data sent to subcribers" });
    } else {
      res.status(200).send({
        message: `[publisher] You have not subcribed to the topic: ${topic}`,
      });
    }
  } else {
    res
      .status(400)
      .send({ message: "[publisher] Topic data MUST be an object" });
  }
});

app.use((req, res, next) => {
  res.status(404).send({
    message: `Route '${req.path}', NOT found`,
  });
});

export default app;
