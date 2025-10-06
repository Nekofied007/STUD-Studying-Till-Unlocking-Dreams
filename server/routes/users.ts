import { Router, type Request, type Response } from "express";
import { z } from "zod";
import type { CreateUserBody } from "@shared/api";
import { prisma } from "../prisma";

const createUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
});

export const usersRouter = Router();

// GET /api/users
usersRouter.get("/", async (_req, res) => {
  const users = await prisma.user.findMany({ orderBy: { createdAt: "desc" } });
  res.json({ users });
});

// POST /api/users
usersRouter.post("/", async (req: Request<unknown, unknown, CreateUserBody>, res: Response) => {
  const parse = createUserSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({ error: parse.error.flatten() });
  }
  const { name, email } = parse.data as CreateUserBody;
  try {
    const user = await prisma.user.create({ data: { name, email } });
    res.status(201).json({ user });
  } catch (e) {
    // likely unique violation on email
    res.status(409).json({ error: "Email already exists" });
  }
});

// GET /api/users/:id
usersRouter.get("/:id", async (req: Request<{ id: string }>, res: Response) => {
  const user = await prisma.user.findUnique({ where: { id: req.params.id } });
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json({ user });
});

// DELETE /api/users/:id
usersRouter.delete("/:id", async (req: Request<{ id: string }>, res: Response) => {
  try {
    const deleted = await prisma.user.delete({ where: { id: req.params.id } });
    res.json({ user: deleted });
  } catch {
    res.status(404).json({ error: "User not found" });
  }
});
