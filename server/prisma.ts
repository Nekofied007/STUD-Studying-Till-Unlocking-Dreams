import { PrismaClient } from "@prisma/client";

// Ensure a single Prisma instance in dev (avoids hot-reload duplicates)
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
