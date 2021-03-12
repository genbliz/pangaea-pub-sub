import http from "http";
import dotenv from "dotenv";
dotenv.config();
import app from "./subscriber";
// --------------------------------------------------------
const port = process.env.SUBSCRIBER_PORT || 9001;

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
  console.log(`Subscribers listening on port ${port}`);
});
