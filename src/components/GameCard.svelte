<script lang="ts">
	import type { GameStats } from '../types';

	let { gameStats }: { gameStats: GameStats } = $props();
</script>

<a href={`game/${gameStats.shortName}`} class="group">
	<div
		class={`w-full bg-white rounded-xl overflow-hidden border-2 border-gray-200 transition-all duration-500 relative`}
	>
		<p>
			Offensive Rating 🎯 {gameStats.offensiveRating} <br />

			Scenario Rating 🍿 {gameStats.scenarioRating}
			<br />
			Defensive Big Plays 🚧 {gameStats.defensiveBigPlays}
			<br />
			Total Rating 🧮 {gameStats.totalRating}
		</p>
		<div
			class="w-full h-full flex items-center justify-center bg-[rgba(255,255,255,0.6)] opacity-0 group-hover:opacity-100 transition-all duration-500"
		>
			Spoil me !
		</div>
	</div>
	<div class="flex items-center justify-between mt-3">
		<h3 class="text-lg text-gray-800 font-medium relative">
			{gameStats.fullName} <br /> Week {gameStats.week}
		</h3>
	</div>
</a>
