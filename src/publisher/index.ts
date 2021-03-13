import http from "http";
import dotenv from "dotenv";
dotenv.config();
import app from "./app";
// --------------------------------------------------------
const port = process.env.PUBLISHER_PORT || 8001;

const server = http.createServer(app);

process.on("unhandledRejection", (reason, promise) => {
  console.log("@process unhandledRejection");
  console.log("Reason:::", reason);
  console.log("Promise::", promise);
});

// handle errors
server.on("error", (error) => {
  switch (error["code"]) {
    case "EACCES":
      console.error(`Port ${port} requires elevated privileges`);
      break;
    case "EADDRINUSE":
      console.error(`Port ${port} is already in use`);
      break;
    default:
      throw error;
  }
});

server.listen(port, () => {
  console.log(`Publisher listening on port ${port}`);
});
