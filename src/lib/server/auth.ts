import type { RequestEvent } from "@sveltejs/kit";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { sveltekitCookies } from "better-auth/svelte-kit";
import { getDb } from "./db";
import * as schema from "./db/schema";

function getPlatformEnv(event: RequestEvent) {
  try {
    return event.platform?.env;
  } catch {
    return undefined;
  }
}

export function getAuth(event: RequestEvent) {
  const db = getDb(event);
  if (!db) {
    throw new Error("D1 binding is missing. Add DB in wrangler.jsonc d1_databases.");
  }

  const platformEnv = getPlatformEnv(event);
  const secret = platformEnv?.BETTER_AUTH_SECRET ?? process.env.BETTER_AUTH_SECRET;
  if (!secret) {
    throw new Error("BETTER_AUTH_SECRET is missing.");
  }

  return betterAuth({
    secret,
    baseURL: platformEnv?.BETTER_AUTH_URL ?? process.env.BETTER_AUTH_URL ?? event.url.origin,
    basePath: "/api/auth",
    database: drizzleAdapter(db, {
      provider: "sqlite",
      schema,
      camelCase: true,
    }),
    emailAndPassword: {
      enabled: true,
    },
    plugins: [sveltekitCookies(() => event)],
  });
}
