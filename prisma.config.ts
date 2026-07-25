import dotenv from "dotenv";
import { defineConfig } from "@prisma/config";

// Next.js loads `.env.local`, but Prisma commands run outside Next.js.
// Load it here so generate, validate, migrate and seed use the same local DB.
dotenv.config({ path: ".env.local", override: false });
dotenv.config({ override: false });

export default defineConfig({
  schema: "prisma/schema.prisma",
});
