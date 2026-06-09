import type { GameStats } from "../../../types.ts";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { API_URL } from "$env/static/private";

export const load: PageServerLoad = async ({ params, url }) => {
  const gameShortName = url.searchParams.get("game");
  const response = await (await fetch(`${API_URL}/games/${params.year}`)).json();

  const res: GameStats = response.filter((game: GameStats) => game.shortName === gameShortName)[0];

  if (!res) {
    throw error(404, "Game not found");
  }

  return {
    gameStats: res,
  };
};
