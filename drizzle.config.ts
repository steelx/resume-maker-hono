import 'dotenv/config';
import {defineConfig} from "drizzle-kit"

export default defineConfig({
  schema: "./server/src/db/schema/*",
  dialect: "postgresql", // "postgresql" | "mysql"
  //driver: "aws-data-api", // optional and used only if `aws-data-api`, `turso`, `d1-http`(WIP) or `expo` are used
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  }
})
