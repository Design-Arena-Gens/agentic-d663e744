import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { quickEntryRouter } from "./routes/quick-entry.routes.js";
import { config } from "./config.js";

const app = express();

app.use(helmet({ contentSecurityPolicy: false }));
app.use(
  cors({
    origin: config.corsOrigins,
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan(config.nodeEnv === "development" ? "dev" : "combined"));

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api", quickEntryRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

export { app };
