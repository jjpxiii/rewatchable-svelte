import { writable } from "svelte/store";

type ToggleResult = { ok: true } | { ok: false; reason: "unauthenticated" | "request_failed" };

const { subscribe, set, update } = writable<string[]>([]);
let isAuthenticated = false;

export const favorites = {
  subscribe,
  sync(ids: string[], authenticated: boolean) {
    isAuthenticated = authenticated;
    set(ids);
  },
  async toggle(id: string): Promise<ToggleResult> {
    if (!isAuthenticated) {
      return { ok: false, reason: "unauthenticated" };
    }

    let nextIds: string[] = [];
    let wasInList = false;

    update((ids) => {
      wasInList = ids.includes(id);
      nextIds = wasInList ? ids.filter((value) => value !== id) : [...ids, id];
      return nextIds;
    });

    const method = wasInList ? "DELETE" : "POST";
    const response = await fetch("/api/watch-list", {
      method,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ gameId: id }),
    });

    if (!response.ok) {
      set(wasInList ? [...nextIds, id] : nextIds.filter((value) => value !== id));
      if (response.status === 401) {
        return { ok: false, reason: "unauthenticated" };
      }
      return { ok: false, reason: "request_failed" };
    }

    return { ok: true };
  },
  clear() {
    set([]);
  },
};
