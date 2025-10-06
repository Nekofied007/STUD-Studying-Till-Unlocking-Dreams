import { type RequestHandler } from "express";
import { z } from "zod";
import type { ProcessStudyRequest, ProcessStudyResponse } from "@shared/api";

const bodySchema = z.object({
  url: z.string().url(),
  action: z.enum(["playlists", "quizzes", "roadmap"]),
});

export const handleStudyProcess: RequestHandler = (req, res) => {
  const parsed = bodySchema.safeParse(req.body as ProcessStudyRequest);
  if (!parsed.success) {
    return res.status(400).json({ status: "error", message: "Invalid request", error: parsed.error.flatten?.() });
  }

  const { url, action } = parsed.data;

  // Demo mocked responses for each action
  const base: ProcessStudyResponse = {
    status: "ok",
    message: `Processed ${action} for ${url}`,
  };

  if (action === "playlists") {
    return res.json({
      ...base,
      data: { playlists: [
        { title: "Foundations", items: 8 },
        { title: "Intermediate", items: 12 },
        { title: "Advanced", items: 6 },
      ] },
    });
  }

  if (action === "quizzes") {
    return res.json({
      ...base,
      data: { quizzes: [
        { topic: "Core Concepts", questions: 10 },
        { topic: "Applied Practice", questions: 12 },
      ] },
    });
  }

  // roadmap
  return res.json({
    ...base,
    data: { roadmap: [
      { phase: "Orientation", durationWeeks: 1 },
      { phase: "Skill Building", durationWeeks: 4 },
      { phase: "Projects", durationWeeks: 3 },
    ] },
  });
};
