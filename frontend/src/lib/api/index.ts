import { hc } from "hono/client";
import type { ApiRoutes } from "@server/src/app";

const httpClient = hc<ApiRoutes>("/");

export const serverApi = httpClient.api;
