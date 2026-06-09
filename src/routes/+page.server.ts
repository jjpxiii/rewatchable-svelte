import type { GameStats } from "../types.ts";
import type { PageServerLoad } from "./$types";
import { env } from "$env/dynamic/private";
import { FAKE_LAST_WEEK, getFakeGameStats } from "$lib/fake-game-stats";

export const load: PageServerLoad = async ({ fetch }) => {
  const apiUrl = env.API_URL;
  const shouldUseFakeData = env.USE_FAKE_DATA === "1" || env.PLAYWRIGHT === "1" || !apiUrl;

  if (shouldUseFakeData) {
    return { gameStats: getFakeGameStats(), lastWeek: FAKE_LAST_WEEK };
  }

  const lastWeek = 18;
  const data: { gameStats: GameStats[]; lastWeek: number } = {
    gameStats: [],
    lastWeek,
  };
  for (let i = 1; i <= lastWeek; i++) {
    const response = await fetch(`${apiUrl}/games/2025/${i}`);
    const gameList = (await response.json()) as GameStats[];
    gameList.forEach((gameStats: GameStats) => {
      data.gameStats.push(
        {
          ...gameStats,
          year: 2025,
          week: i,
          totalRating:
            gameStats.offensiveRating * 1.5 +
            gameStats.defensiveBigPlays * 0.5 +
            gameStats.scenarioRating,
        },
        // id: gameStats.id,
        // fullName: gameStats.fullName,
        // shortName: gameStats.shortName,
        // matchupQuality: gameStats.matchupQuality,
        // offense: gameStats.offense,
        // scenario: gameStats.scenarioRating,
        // // marginOfVictory: gameStats.scenario?.marginOfVictory,
        // // offensiveBigPlays: gameStats.offense.offensiveBigPlays,
        // // offensiveExplosivePlays: gameStats.offense.offensiveExplosivePlays,
        // // offensiveRating: computeOffensiveRating(gameStats),
        // // defensiveBigPlays: computeDefensiveBigPlays(gameStats),
        // // leadershipChange: gameStats.scenario.leadershipChange,
        // // fourthQuarterLeadershipChange:
        // //   gameStats.scenario.fourthQuarterLeadershipChange,
        // // scenarioRating: gameStats.scenario.scenarioRating,
      );
    });
    data.gameStats = data.gameStats.toSorted((a, b) => b.totalRating - a.totalRating);
  }
  return { gameStats: data.gameStats, lastWeek };
};
