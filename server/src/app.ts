import { Hono } from "hono";
import { logger } from "hono/logger";
import { expensesRoute } from "./routes/expenses";
import { serveStatic } from "hono/bun";
import {authRoute} from "./routes/auth.ts";

const app = new Hono();

app.use(logger());

// API route
const apiRoutes = app.basePath("/api")
  .route("/expenses", expensesRoute)
  .route("/", authRoute);

// Serve frontend build
app.get("*", serveStatic({ root: "./frontend/dist" }));
app.get("*", serveStatic({ path: "./frontend/dist/index.html" }));

export default app;
export type ApiRoutes = typeof apiRoutes;
