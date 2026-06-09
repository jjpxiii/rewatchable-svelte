import { eq } from "drizzle-orm";
import type { LayoutServerLoad } from "./$types";
import { getDb } from "$lib/server/db";
import { watchListItem } from "$lib/server/db/schema";

export const load: LayoutServerLoad = async (event) => {
  const db = getDb(event);
  const user = event.locals.user;
  const session = event.locals.session;

  if (!db || !user) {
    return {
      session: null,
      user: null,
      watchListIds: [],
    };
  }

  const rows = await db.select({ gameId: watchListItem.gameId }).from(watchListItem).where(eq(watchListItem.userId, user.id));

  return {
    session,
    user,
    watchListIds: rows.map((row) => row.gameId),
  };
};
