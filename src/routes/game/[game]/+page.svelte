<script lang="ts">
	import { computeDefensiveBigPlays, computeOffensiveRating } from '../../../rating';
	import type { PageProps } from '../$types';

	let { data }: PageProps = $props();
	console.log('POERKGPOEKRGOPKERG');
	console.log(data);
	const { gameStats } = data;
</script>

<h1 class="text-lg text-gray-800 font-medium relative">
	{gameStats.fullName}
</h1>
<!-- <div
	class={`w-full bg-white rounded-xl overflow-hidden border-2 border-gray-200 transition-all duration-500 relative`}
> -->
<h3>Offense</h3>
YPA {gameStats.offense.totalYardsPerAttempt}
<br />
Pass YPA {gameStats.offense.totalPassYardsPerAttempt}
<br />
total points {gameStats.offense.totalPoints}
<br />
Explosive Plays {gameStats.offense.offensiveExplosivePlays}
<br />
Big Plays {gameStats.offense.offensiveBigPlays}
<br />
Total Yards {gameStats.offense.totalYards}
<br />
Explosive Play rate
{((gameStats.offense.offensiveExplosivePlays / gameStats.offense.totalPlays) * 100).toFixed(2)}
<br />
Big Play rate
{((gameStats.offense.offensiveBigPlays / gameStats.offense.totalPlays) * 100).toFixed(2)}
<br />
Offensive Rating {computeOffensiveRating(gameStats)}
<br />
<br />
<h3>Defense</h3>
Defensive Big Plays {computeDefensiveBigPlays(gameStats)}
<br />
<br />
<h3>Scenario</h3>
Home QB Rating {(gameStats?.offense?.homeQBR).toFixed(2)}
<br /> Away QB Rating {(gameStats?.offense?.awayQBR).toFixed(2)}
<br />
margin of victory {gameStats.scenario.marginOfVictory}
<br />
leadershipChange {gameStats.scenario.leadershipChange}
<br />
4th quarter {gameStats.scenario.fourthQuarterLeadershipChange}
<br />
Scenario Rating {gameStats.scenario.scenarioRating}
<br />
Total Rating {computeOffensiveRating(gameStats) +
	computeDefensiveBigPlays(gameStats) +
	gameStats.scenario.scenarioRating}
<br /><br />
<h3>Misc</h3>
Matchup Quality {gameStats.matchupQuality}
<!-- </div> -->
