import http from "node:http";
import { app } from "./app.js";
import { config } from "./config.js";

const server = http.createServer(app);

const start = async () => {
  server.listen(config.port, () => {
    console.log(`API server running on port ${config.port}`);
  });
};

start().catch((error) => {
  console.error("Failed to start server", error);
  process.exit(1);
});
