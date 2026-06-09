import { drizzle } from "drizzle-orm/d1";
import type { RequestEvent } from "@sveltejs/kit";
import * as schema from "./schema";

function getD1(event: RequestEvent) {
  try {
    return event.platform?.env?.DB;
  } catch {
    return undefined;
  }
}

export function getDb(event: RequestEvent) {
  const d1 = getD1(event);
  if (!d1) {
    return null;
  }

  return drizzle(d1, { schema });
}
