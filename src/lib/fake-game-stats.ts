import type { GameStats } from "../types";

export const FAKE_LAST_WEEK = 1;

const matchups: Array<{ home: string; away: string }> = [
  { home: "ARI", away: "ATL" },
  { home: "BAL", away: "BUF" },
  { home: "CAR", away: "CHI" },
  { home: "CIN", away: "CLE" },
  { home: "DAL", away: "DEN" },
  { home: "DET", away: "GB" },
  { home: "HOU", away: "IND" },
  { home: "JAX", away: "KC" },
  { home: "LAC", away: "LAR" },
  { home: "LV", away: "MIA" },
  { home: "MIN", away: "NE" },
  { home: "NO", away: "NYG" },
  { home: "NYJ", away: "PHI" },
  { home: "PIT", away: "SEA" },
  { home: "SF", away: "TB" },
  { home: "TEN", away: "WSH" },
];

const offensiveRatings = [88, 72, 95, 80, 76, 90, 85, 78, 92, 74, 81, 89, 83, 77, 91, 79];
const defensiveBigPlays = [4, 9, 6, 10, 3, 8, 5, 7, 11, 2, 12, 1, 13, 14, 15, 16];
const scenarioRatings = [20, 18, 22, 16, 24, 14, 26, 12, 28, 10, 30, 8, 32, 6, 34, 4];

const makeGameStats = (index: number, home: string, away: string, week: number): GameStats => {
  const offensiveRating = offensiveRatings[index];
  const defensiveRating = defensiveBigPlays[index];
  const scenarioRating = scenarioRatings[index];
  const totalRating = offensiveRating * 1.5 + defensiveRating * 0.5 + scenarioRating;

  return {
    id: `${home}-${away}-2025-${String(week).padStart(2, "0")}`,
    year: 2025,
    week,
    fullName: `${home} vs ${away}`,
    shortName: `${home}-${away}-2025-W${week}`,
    matchupQuality: "good",
    offensiveRating,
    defensiveBigPlays: defensiveRating,
    scenarioRating,
    totalRating,
    efficiency: {
      homeTeamEfficiency: 0,
      awayTeamEfficiency: 0,
      homeTeamOffensiveEfficiency: 0,
      homeTeamDefensiveEfficiency: 0,
      awayTeamOffensiveEfficiency: 0,
      awayTeamDefensiveEfficiency: 0,
      homeTeamPerformance: 0,
      awayTeamPerformance: 0,
    },
    scenario: {
      fourthQuarterLeadershipChange: 0,
      leadershipChange: 0,
      scenarioRating,
      scenarioData: {
        maxWinProbability: 0,
        minWinProbability: 0,
        inversionOfLead: 0,
        shareOfLead: 0,
        max_4th: 0,
        min_4th: 0,
        inv_4th: 0,
        share_4th: 0,
      },
    },
    offense: {
      offensiveBigPlays: 0,
      offensiveExplosivePlays: 0,
      explosiveRate: 0,
      totalPlays: 0,
      totalPoints: 0,
      totalYards: 0,
      totalYardsPerAttempt: 0,
      totalPassYards: 0,
      totalPassYardsPerAttempt: 0,
      totalRushYards: 0,
      totalRushYardsPerAttempt: 0,
      homeQBR: 0,
      awayQBR: 0,
    },
    defense: {
      punts: 0,
      sacks: 0,
      interceptions: 0,
      defensiveTds: 0,
      fumbleRecs: 0,
      blockedKicks: 0,
      safeties: 0,
      specialTeamsTd: 0,
      goalLineStands: 0,
    },
  };
};

export const fakeGameStats: GameStats[] = matchups.map((matchup, index) =>
  makeGameStats(index, matchup.home, matchup.away, 1),
);

export const getFakeGameStats = () => fakeGameStats.slice();
