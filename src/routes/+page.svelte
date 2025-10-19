<script lang="ts">
	import GameCard from '../components/GameCard.svelte';
	import type { GameStats } from '../types';

	interface GameListProps {
		data: { gameStats: GameStats[]; lastWeek: number };
	}

	let sortOrder = $state('offensive');
	let selectedYear = $state(5);
	let selectedWeek = $state(0);

	const { data } = $props() as GameListProps;
	const gameStats: GameStats[] = data.gameStats;
	const lastWeek = data.lastWeek;

	let gameStatsFiltered = $derived(() =>
		selectedWeek > 0 ? gameStats.filter((game) => game.week === selectedWeek) : gameStats
	);

	let gameStatsSorted = $derived(() =>
		[...gameStatsFiltered()].sort((a, b) =>
			sortOrder === 'offensive'
				? b.offensiveRating - a.offensiveRating
				: sortOrder === 'defensive'
					? b.defensiveBigPlays - a.defensiveBigPlays
					: sortOrder === 'scenario'
						? b.scenarioRating - a.scenarioRating
						: b.totalRating - a.totalRating
		)
	);

	let statistics = $derived(() => {
		const totalRatings = gameStatsFiltered().map((game) => game.totalRating);
		const totalMin = Math.min(...totalRatings);
		const totalMax = Math.max(...totalRatings);
		const totalMean = totalRatings.reduce((acc, rating) => acc + rating, 0) / totalRatings.length;

		const offensiveRatings = gameStatsFiltered().map((game) => game.offensiveRating);
		const offensiveMin = Math.min(...offensiveRatings);
		const offensiveMax = Math.max(...offensiveRatings);
		const offensiveMean =
			offensiveRatings.reduce((acc, rating) => acc + rating, 0) / offensiveRatings.length;

		const defensiveRatings = gameStatsFiltered().map((game) => game.defensiveBigPlays);
		const defensiveMin = Math.min(...defensiveRatings);
		const defensiveMax = Math.max(...defensiveRatings);
		const defensiveMean =
			defensiveRatings.reduce((acc, rating) => acc + rating, 0) / defensiveRatings.length;

		const scenarioRatings = gameStatsFiltered().map((game) => game.scenarioRating);
		const scenarioMin = Math.min(...scenarioRatings);
		const scenarioMax = Math.max(...scenarioRatings);
		const scenarioMean =
			scenarioRatings.reduce((acc, rating) => acc + rating, 0) / scenarioRatings.length;

		return {
			total: { min: totalMin, max: totalMax, mean: totalMean },
			offensive: { min: offensiveMin, max: offensiveMax, mean: offensiveMean },
			defensive: { min: defensiveMin, max: defensiveMax, mean: defensiveMean },
			scenario: { min: scenarioMin, max: scenarioMax, mean: scenarioMean }
		};
	});
</script>

<svelte:head>
	<title>Rewatchable games</title>
	<meta name="description" content="Rewatchable games" />
</svelte:head>

<section>
	<div>
		<!-- <div class="flex gap-2 w-full">
    <p class="flex-grow-1 font-bold text-xl">
      Year {year}
    </p>
    <button
      class="px-2 py-1 border(gray-100 2) hover:bg-gray-200"
      onClick={() => setYear(2021)}
    >
      2021
    </button>
    <button
      class="px-2 py-1 border(gray-100 2) hover:bg-gray-200"
      onClick={() => setYear(2022)}
    >
      2022
    </button>
    <button
      class="px-2 py-1 border(gray-100 2) hover:bg-gray-200"
      onClick={() => setYear(2023)}
    >
      2023
    </button>
    <button
      class="px-2 py-1 border(gray-100 2) hover:bg-gray-200"
      onClick={() => setYear(2024)}
    >
      2024
    </button>
    <button
      class="px-2 py-1 border(gray-100 2) hover:bg-gray-200"
      onClick={() => setYear(2025)}
    >
      2025
    </button>
  </div> -->
		<div>
			<p class="flex-grow-1 font-bold text-xl">Year</p>
			{#each { length: 6 }, i}
				<button
					class="px-2 py-1 border(gray-100 2) hover:bg-gray-200 {selectedYear === i
						? 'bg-orange-400 text-white'
						: ''}"
					onclick={() => (selectedYear = i)}
				>
					<a href="/{2020 + i}">{i === 0 ? 'All' : 2020 + i}</a>
				</button>
			{/each}
		</div>
		<div>
			<p class="flex-grow-1 font-bold text-xl">Weeks</p>
			{#each { length: lastWeek + 1 }, i}
				<button
					class="px-2 py-1 border(gray-100 2) hover:bg-gray-200 {selectedWeek === i
						? 'bg-orange-400 text-white'
						: ''}"
					onclick={() => (selectedWeek = i)}
				>
					{i === 0 ? 'All' : i}
				</button>
			{/each}
		</div>
		<div>
			<p class="flex-grow-1 font-bold text-xl">Statistics</p>
			<p>Criteria : min / max / mean</p>
			<p>
				Total : {statistics().total.min.toFixed(2)} / {statistics().total.max.toFixed(2)} / {statistics().total.mean.toFixed(
					2
				)}
			</p>
			<p>
				Offense: {statistics().offensive.min.toFixed(2)} / {statistics().offensive.max.toFixed(2)} /
				{statistics().offensive.mean.toFixed(2)}
			</p>
			<p>
				Defense: {statistics().defensive.min.toFixed(2)} / {statistics().defensive.max.toFixed(2)} /
				{statistics().defensive.mean.toFixed(2)}
			</p>
			<p>
				Scenario: {statistics().scenario.min.toFixed(2)} / {statistics().scenario.max.toFixed(2)} / {statistics().scenario.mean.toFixed(
					2
				)}
			</p>
		</div>
		<br />
		<div class="flex gap-2 w-full">
			<p class="flex-grow-1 font-bold text-xl">
				Sorted by {sortOrder} rating ⬇
			</p>
			<button
				class="px-2 py-1 border(gray-100 2) hover:bg-gray-200 {sortOrder === 'total'
					? 'bg-orange-400 text-white'
					: ''}"
				onclick={() => (sortOrder = 'total')}
			>
				Total rating ⬇
			</button>
			<button
				class="px-2 py-1 border(gray-100 2) hover:bg-gray-200 {sortOrder === 'offensive'
					? 'bg-orange-400 text-white'
					: ''}"
				onclick={() => (sortOrder = 'offensive')}
			>
				Offensive rating ⬇
			</button>
			<button
				class="px-2 py-1 border(gray-100 2) hover:bg-gray-200 {sortOrder === 'scenario'
					? 'bg-orange-400 text-white'
					: ''}"
				onclick={() => (sortOrder = 'scenario')}
			>
				Scenario rating ⬇
			</button>
			<button
				class="px-2 py-1 border(gray-100 2) hover:bg-gray-200 {sortOrder === 'defensive'
					? 'bg-orange-400 text-white'
					: ''}"
				onclick={() => (sortOrder = 'defensive')}
			>
				Defensive rating ⬇
			</button>
		</div>
		<br />

		<div
			class="grid grid-cols-1 gap-8 sm:!gap-x-10 sm:!grid-cols-2 lg:!grid-cols-4 lg:!gap-x-12 lg:!gap-y-10"
		>
			{#each gameStatsSorted() as item}
				<GameCard gameStats={item} />
			{/each}
		</div>
	</div>
</section>

<!-- <style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style> -->
