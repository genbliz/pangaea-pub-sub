import { envConfig, subscribersUrls } from "./../config";
import supertest from "supertest";
import { setup as setupDevServer } from "jest-dev-server";
import { teardown as teardownDevServer } from "jest-dev-server";
import app from "../publisher/app";
const request = supertest(app);

describe("Publisher", () => {
  beforeAll(async () => {
    jest.setTimeout(20000);

    await setupDevServer({
      command: "npm run start:test",
      launchTimeout: 20000,
      port: envConfig.SUBSCRIBER_PORT,
    });
  });

  afterAll(async (done) => {
    await teardownDevServer();
    done();
  });

  it("Should subscribe to topic", async () => {
    const result = await request.post(`/subscribe/testing`).send({
      url: subscribersUrls[0],
    });
    expect(result.status).toBe(200);

    expect(result.body).toHaveProperty("topic");
    expect(result.body).toHaveProperty("url");
  });

  it("Should publish to topic and respond with 200", async () => {
    const result = await request.post(`/publish/testing`).send({
      msg: "Just for test",
    });
    expect(result.status).toBe(200);
  });
});
