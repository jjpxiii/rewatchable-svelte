<script lang="ts">
	import { computeDefensiveBigPlays, computeOffensiveRating } from '../../../rating';
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();
</script>

<h1 class="text-lg text-gray-800 font-medium relative">
	{data.gameStats.fullName}
</h1>
<div
	class={`w-full bg-white rounded-xl overflow-hidden border-2 border-gray-200 transition-all duration-500 relative`}
>
	<h3>Offense</h3>
	YPA {data.gameStats.offense.totalYardsPerAttempt}
	<br />
	Pass YPA {data.gameStats.offense.totalPassYardsPerAttempt}
	<br />
	total points {data.gameStats.offense.totalPoints}
	<br />
	Explosive Plays {data.gameStats.offense.offensiveExplosivePlays}
	<br />
	Big Plays {data.gameStats.offense.offensiveBigPlays}
	<br />
	Total Yards {data.gameStats.offense.totalYards}
	<br />
	Explosive Play rate
	{((data.gameStats.offense.offensiveExplosivePlays / data.gameStats.offense.totalPlays) * 100).toFixed(2)}
	<br />
	Big Play rate
	{((data.gameStats.offense.offensiveBigPlays / data.gameStats.offense.totalPlays) * 100).toFixed(2)}
	<br />
	Offensive Rating {computeOffensiveRating(data.gameStats)}
	<br />
	<h3>Defense</h3>
	Defensive Big Plays {computeDefensiveBigPlays(data.gameStats)}
	<br />
	<h3>Scenario</h3>
	Home QB Rating {(data.gameStats?.offense?.homeQBR).toFixed(2)}
	<br /> Away QB Rating {(data.gameStats?.offense?.awayQBR).toFixed(2)}
	<br />
	margin of victory {data.gameStats.scenario.marginOfVictory}
	<br />
	leadershipChange {data.gameStats.scenario.leadershipChange}
	<br />
	4th quarter {data.gameStats.scenario.fourthQuarterLeadershipChange}
	<br />
	Scenario Rating {data.gameStats.scenario.scenarioRating}
	<br />
	Total Rating {computeOffensiveRating(data.gameStats) +
		computeDefensiveBigPlays(data.gameStats) +
		data.gameStats.scenario.scenarioRating}

	<h3>Misc</h3>
	Matchup Quality {data.gameStats.matchupQuality}
</div>
