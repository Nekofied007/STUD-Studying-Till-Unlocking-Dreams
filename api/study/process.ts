import { z } from "zod";

const bodySchema = z.object({
  url: z.string().url(),
  action: z.enum(["playlists", "quizzes", "roadmap"]),
});

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ status: "error", message: "Method Not Allowed" });
  }

  let body: any = req.body;
  if (!body && req.rawBody) {
    try {
      body = JSON.parse(req.rawBody.toString());
    } catch {}
  }
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {}
  }

  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return res.status(400).json({ status: "error", message: "Invalid request", error: parsed.error.flatten?.() });
  }

  const { url, action } = parsed.data;

  const base = { status: "ok" as const, message: `Processed ${action} for ${url}` };

  if (action === "playlists") {
    return res.json({
      ...base,
      data: {
        playlists: [
          { title: "Foundations", items: 8 },
          { title: "Intermediate", items: 12 },
          { title: "Advanced", items: 6 },
        ],
      },
    });
  }

  if (action === "quizzes") {
    return res.json({
      ...base,
      data: {
        quizzes: [
          { topic: "Core Concepts", questions: 10 },
          { topic: "Applied Practice", questions: 12 },
        ],
      },
    });
  }

  return res.json({
    ...base,
    data: {
      roadmap: [
        { phase: "Orientation", durationWeeks: 1 },
        { phase: "Skill Building", durationWeeks: 4 },
        { phase: "Projects", durationWeeks: 3 },
      ],
    },
  });
}
