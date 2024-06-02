import { PrismaClient } from "@Prisma/client";
import logger from "./logger.js";

export const Prisma = new PrismaClient({
  log: [
    {
      emit: "event",
      level: "query",
    },
    {
      emit: "stdout",
      level: "error",
    },
    {
      emit: "stdout",
      level: "info",
    },
    {
      level: "warn",
      emit: "stdout",
    },
  ],
});
Prisma.$on("error", (e) => {
  logger.error(e);
});
Prisma.$on("warn", (e) => {
  logger.warn(e);
});
Prisma.$on("info", (e) => {
  logger.info(e);
});
Prisma.$on("query", (e) => {
  logger.info(e);
});
