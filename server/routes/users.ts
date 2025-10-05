import { Router, type Request, type Response } from "express";
import { z } from "zod";
import type { CreateUserBody, User } from "@shared/api";
import { prisma } from "../prisma";
import { randomUUID } from "node:crypto";

const createUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
});

export const usersRouter = Router();
const useDb = Boolean(process.env.DATABASE_URL);
const memoryUsers: User[] = [];

// GET /api/users
usersRouter.get("/", async (_req, res) => {
  if (useDb) {
    const users = await prisma.user.findMany({ orderBy: { createdAt: "desc" } });
    return res.json({ users });
  }
  // In-memory fallback
  return res.json({ users: memoryUsers.slice().reverse() });
});

// POST /api/users
usersRouter.post("/", async (req: Request<unknown, unknown, CreateUserBody>, res: Response) => {
  const parse = createUserSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({ error: parse.error.flatten() });
  }
  const { name, email } = parse.data as CreateUserBody;
  if (useDb) {
    try {
      const user = await prisma.user.create({ data: { name, email } });
      return res.status(201).json({ user });
    } catch (e) {
      // likely unique violation on email
      return res.status(409).json({ error: "Email already exists" });
    }
  }
  // In-memory fallback
  if (memoryUsers.some(u => u.email.toLowerCase() === email.toLowerCase())) {
    return res.status(409).json({ error: "Email already exists" });
  }
  const user: User = { id: randomUUID(), name, email };
  memoryUsers.push(user);
  return res.status(201).json({ user });
});

// GET /api/users/:id
usersRouter.get("/:id", async (req: Request<{ id: string }>, res: Response) => {
  if (useDb) {
    const user = await prisma.user.findUnique({ where: { id: req.params.id } });
    if (!user) return res.status(404).json({ error: "User not found" });
    return res.json({ user });
  }
  const user = memoryUsers.find(u => u.id === req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  return res.json({ user });
});

// DELETE /api/users/:id
usersRouter.delete("/:id", async (req: Request<{ id: string }>, res: Response) => {
  if (useDb) {
    try {
      const deleted = await prisma.user.delete({ where: { id: req.params.id } });
      return res.json({ user: deleted });
    } catch {
      return res.status(404).json({ error: "User not found" });
    }
  }
  const idx = memoryUsers.findIndex(u => u.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "User not found" });
  const [deleted] = memoryUsers.splice(idx, 1);
  return res.json({ user: deleted });
});
