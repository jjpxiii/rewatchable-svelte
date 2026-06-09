<script lang="ts">
	import { goto } from '$app/navigation';
	import { favorites } from '$lib/favorites';
	import type { GameStats } from '../types';

	const { gameStats }: { gameStats: GameStats } = $props();

	const isFavorite = $derived.by(() => $favorites.includes(gameStats.id));

	const toggleFavorite = async () => {
		const result = await favorites.toggle(gameStats.id);
		if (!result.ok && result.reason === 'unauthenticated') {
			await goto(`/login?redirect=${encodeURIComponent(window.location.pathname)}`);
		}
	};
</script>

<div class="group relative" data-testid="game-card">
	<a href={`/game/${gameStats.shortName}`} class="block">
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
			<h3 class="text-lg text-gray-800 font-medium relative" data-testid="game-card-name">
				{gameStats.fullName} <br /> Week {gameStats.week}
			</h3>
		</div>
	</a>
	<button
		class={`absolute top-2 right-2 p-2 rounded-full text-sm shadow-sm transition z-10 ${
			isFavorite
				? 'bg-amber-600 text-white shadow-amber-200/60'
				: 'bg-white bg-opacity-80 text-amber-700 hover:bg-opacity-100'
		}`}
		aria-pressed={isFavorite}
		title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
		onclick={toggleFavorite}
	>
		<span class="block text-base leading-none" aria-hidden="true">🏈</span>
		<span class="sr-only">{isFavorite ? 'Remove from favorites' : 'Add to favorites'}</span>
	</button>
</div>
