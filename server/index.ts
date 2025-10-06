import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { usersRouter } from "./routes/users.ts";
import { handleStudyProcess } from "./routes/study";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Study processing demo endpoint
  app.post("/api/study/process", handleStudyProcess);

  // Users API (in-memory by default; see README steps to switch to Prisma)
  app.use("/api/users", usersRouter);

  return app;
}
