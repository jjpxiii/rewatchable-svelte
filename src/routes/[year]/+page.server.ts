import type { PageServerLoad } from "./$types";
import { API_URL } from "$env/static/private";
import type { GameStats } from "../../types.ts";

export const load: PageServerLoad = async ({ fetch, params }) => {
    const lastWeek = 6;
    const data: { gameStats: GameStats[]; lastWeek: number; year: number } = {
        gameStats: [],
        lastWeek,
        year: Number(params.year),
    };

    for (let i = 1; i <= lastWeek; i++) {
        const response = await fetch(`${API_URL}/games/${params.year}/${i}`);
        const gameList = (await response.json()) as GameStats[];
        gameList.forEach((gameStats: GameStats) => {
            data.gameStats.push(
                {
                    ...gameStats,
                    year: params.year,
                    week: i,
                    totalRating: gameStats.offensiveRating * 1.5 +
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
        data.gameStats = data.gameStats.toSorted((a, b) =>
            b.totalRating - a.totalRating
        );
    }
    return { gameStats: data.gameStats, lastWeek, year: data.year };
};
