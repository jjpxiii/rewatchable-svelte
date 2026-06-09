import { toSvelteKitHandler } from "better-auth/svelte-kit";
import { getAuth } from "$lib/server/auth";
import type { RequestHandler } from "./$types";

const handler: RequestHandler = async (event) => {
  const auth = getAuth(event);
  return toSvelteKitHandler(auth)(event);
};

export const GET = handler;
export const POST = handler;
