import cors from "cors";
import express from "express";
import helmet from "helmet";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.post("/test1", (req, res) => {
  console.log(JSON.stringify(req.body, null, 2));
  res.json("Recieved");
});

app.post("/test2", (req, res) => {
  console.log(JSON.stringify(req.body, null, 2));
  res.json("Recieved");
});

app.use((req, res, next) => {
  res.status(404).send({
    message: `Route '${req.path}', NOT found`,
  });
});

export default app;