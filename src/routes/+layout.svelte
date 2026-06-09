<script lang="ts">
	import '../app.css';
import { favorites } from '$lib/favorites';

	interface LayoutData {
		session: App.Locals['session'];
		user: App.Locals['user'];
		watchListIds: string[];
	}

	const { data, children } = $props() as { data: LayoutData; children: import('svelte').Snippet };

	$effect(() => {
		favorites.sync(data.watchListIds, Boolean(data.session));
	});

	const signOut = async () => {
		const response = await fetch('/api/auth/sign-out', {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: '{}'
		});
		if (!response.ok) {
			return;
		}

		favorites.clear();
		window.location.assign('/');
	};
</script>

<div class="app">
	<!-- <Header /> -->
	<nav class="flex items-center justify-between gap-4 py-4">
		<a href="/" class="text-lg font-semibold text-gray-900 hover:text-amber-700">
			Rewatchable Games
		</a>
		<a href="/favorites" class="text-sm font-medium text-amber-700 hover:text-amber-800">
			Watch list ({$favorites.length})
		</a>
		{#if data.session}
			<button
				type="button"
				class="text-sm font-medium text-gray-700 hover:text-gray-900 cursor-pointer"
				onclick={signOut}
			>
				Sign out
			</button>
		{:else}
			<a href="/login" class="text-sm font-medium text-gray-700 hover:text-gray-900">Sign in</a>
		{/if}
	</nav>

	<main>
		{@render children()}
	</main>

	<!-- <footer>
		<p>
			visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to learn about SvelteKit
		</p>
	</footer> -->
</div>

<!-- <style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style> -->
