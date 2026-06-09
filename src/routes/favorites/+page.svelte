<script lang="ts">
	import { page } from '$app/stores';
	import GameCard from '../../components/GameCard.svelte';
	import { favorites } from '$lib/favorites';
	import type { GameStats } from '../../types';

	interface FavoritesProps {
		data: { gameStats: GameStats[]; lastWeek: number; session: any };
	}

	const { data } = $props() as FavoritesProps;
	const isSignedIn = $derived(Boolean(data.session));

	const favoriteGames = $derived.by(() => data.gameStats.filter((game) => $favorites.includes(game.id)));
</script>

<svelte:head>
	<title>Watch list</title>
	<meta name="description" content="Watch list of rewatchable games" />
</svelte:head>

<section>
	<div class="flex items-center justify-between gap-4">
		<h1 class="text-2xl font-semibold">Watch list</h1>
		<p class="text-sm text-gray-500">{favoriteGames.length} saved</p>
	</div>
	{#if !isSignedIn}
		<p class="mt-6 text-gray-600">Sign in to save your watch list and access it from any browser.</p>
		<a href="/login?redirect=%2Ffavorites" class="inline-block mt-3 text-amber-700 hover:underline"
			>Sign in</a
		>
	{:else if favoriteGames.length === 0}
		<p class="mt-6 text-gray-600">
			No games saved yet. Pick some games from the main list to see them here.
		</p>
		<a href="/" class="inline-block mt-3 text-amber-700 hover:underline">Browse games</a>
	{:else}
		<div
			class="mt-6 grid grid-cols-1 gap-8 sm:gap-x-10! sm:grid-cols-2! lg:grid-cols-4! lg:gap-x-12! lg:gap-y-10!"
		>
			{#each favoriteGames as item}
				<GameCard gameStats={item} />
			{/each}
		</div>
	{/if}
</section>
