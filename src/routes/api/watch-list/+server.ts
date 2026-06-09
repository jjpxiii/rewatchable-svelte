import { and, eq } from "drizzle-orm";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { getDb } from "$lib/server/db";
import { watchListItem } from "$lib/server/db/schema";

function getUserId(event: Parameters<RequestHandler>[0]) {
  return event.locals.user?.id ?? null;
}

export const GET: RequestHandler = async (event) => {
  const db = getDb(event);
  const userId = getUserId(event);

  if (!db || !userId) {
    return json({ ids: [] });
  }

  const rows = await db.select({ gameId: watchListItem.gameId }).from(watchListItem).where(eq(watchListItem.userId, userId));
  return json({ ids: rows.map((row) => row.gameId) });
};

export const POST: RequestHandler = async (event) => {
  const db = getDb(event);
  const userId = getUserId(event);
  if (!db || !userId) {
    return json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await event.request.json()) as { gameId?: unknown };
  if (typeof body.gameId !== "string" || body.gameId.length === 0) {
    return json({ error: "Invalid gameId" }, { status: 400 });
  }

  await db.insert(watchListItem).values({ userId, gameId: body.gameId }).onConflictDoNothing();
  return json({ ok: true });
};

export const DELETE: RequestHandler = async (event) => {
  const db = getDb(event);
  const userId = getUserId(event);
  if (!db || !userId) {
    return json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await event.request.json()) as { gameId?: unknown };
  if (typeof body.gameId !== "string" || body.gameId.length === 0) {
    return json({ error: "Invalid gameId" }, { status: 400 });
  }

  await db
    .delete(watchListItem)
    .where(and(eq(watchListItem.userId, userId), eq(watchListItem.gameId, body.gameId)));
  return json({ ok: true });
};
