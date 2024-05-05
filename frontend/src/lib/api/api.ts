import { hc } from "hono/client";
import type { ApiRoutes } from "@server/src/app";

const httpClient = hc<ApiRoutes>("/");

export const api = httpClient.api;
