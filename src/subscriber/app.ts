import cors from "cors";
import express from "express";
import helmet from "helmet";

interface ISubPayload {
  data: Record<string, any>;
  topic: string;
}

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

function isSubDataValid(data: ISubPayload) {
  if (!(data?.topic && typeof data.topic === "string")) {
    // throw new Error("body.topic is required and must be a string");
    return false;
  }
  if (typeof data?.data === "undefined") {
    return false;
  }
  return true;
}

app.post("/sub01", (req, res) => {
  if (!isSubDataValid(req.body)) {
    return res.status(400).send({
      message: `[subscriber] invalid payload data`,
    });
  }
  console.log(JSON.stringify(req.body, null, 2));
  res.json("Ok");
});

app.post("/sub02", (req, res) => {
  if (!isSubDataValid(req.body)) {
    return res.status(400).send({
      message: `[subscriber] invalid payload data`,
    });
  }
  console.log(JSON.stringify(req.body, null, 2));
  res.json("Ok");
});

app.use((req, res, next) => {
  res.status(404).send({
    message: `Route '${req.path}', NOT found`,
  });
});

export default app;
