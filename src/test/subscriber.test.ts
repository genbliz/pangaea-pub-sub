import supertest from "supertest";
import app from "../subscriber/app";
const request = supertest(app);

describe("Subscriber", () => {
  it("Should accept data and respond with 200: sub01", async () => {
    const result = await request.post(`/sub01`).send({
      topic: "testing",
      data: { test: "Hello" },
    });
    expect(result.status).toBe(200);
    expect(result.body).toBe("Ok");
  });

  it("Should accept data and respond with 200: sub02", async () => {
    const result = await request.post(`/sub02`).send({
      topic: "testing2",
      data: { test: "Hello2" },
    });
    expect(result.status).toBe(200);
    expect(result.body).toBe("Ok");
  });

  it("Should reject when data is not part of payload", async () => {
    const result = await request.post(`/sub01`).send({
      topic: "testing",
    });
    expect(result.status).toBe(400);
  });

  it("Should reject when topic is not part of payload", async () => {
    const result = await request.post(`/sub02`).send({
      data: "testing",
    });
    expect(result.status).toBe(400);
  });
});
