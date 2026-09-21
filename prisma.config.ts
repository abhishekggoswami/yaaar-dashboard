import { config } from "dotenv";
import { defineConfig, env } from "prisma/config";

// Next.js loads .env.local at runtime; Prisma CLI needs the same local, ignored configuration.
config({ path: ".env.local", quiet: true });

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Neon direct connections are required for Prisma CLI/migration operations.
    url: env("DIRECT_DATABASE_URL"),
  },
});
