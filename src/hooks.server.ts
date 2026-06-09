import { building } from "$app/environment";
import type { Handle } from "@sveltejs/kit";
import { svelteKitHandler } from "better-auth/svelte-kit";
import { getAuth } from "$lib/server/auth";

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.user = null;
  event.locals.session = null;

  if (building) {
    return resolve(event);
  }

  let hasDb = false;
  let hasSecret = false;
  try {
    hasDb = Boolean(event.platform?.env?.DB);
    hasSecret = Boolean(event.platform?.env?.BETTER_AUTH_SECRET ?? process.env.BETTER_AUTH_SECRET);
  } catch {
    hasDb = false;
    hasSecret = Boolean(process.env.BETTER_AUTH_SECRET);
  }

  if (!hasDb || !hasSecret) {
    if (event.url.pathname.startsWith("/api/auth")) {
      return new Response("Auth is not configured. Missing D1 binding or BETTER_AUTH_SECRET.", { status: 500 });
    }
    return resolve(event);
  }

  const auth = getAuth(event);
  const sessionResult = await auth.api.getSession({
    headers: event.request.headers,
  });
  event.locals.user = sessionResult?.user ?? null;
  event.locals.session = sessionResult?.session ?? null;

  return svelteKitHandler({
    auth,
    event,
    resolve,
    building,
  });
};

export const handleError = ({ error }) => {
  console.error("Server error:", error);
};
