<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { authClient } from '$lib/auth-client';

	let mode = $state<'sign-in' | 'sign-up'>('sign-in');
	let name = $state('');
	let email = $state('');
	let password = $state('');
	let errorMessage = $state('');
	let isSubmitting = $state(false);

	const redirectTo = $derived.by(() => {
		const value = $page.url.searchParams.get('redirect');
		return value && value.startsWith('/') ? value : '/';
	});

	const submit = async () => {
		errorMessage = '';
		isSubmitting = true;

		try {
			if (mode === 'sign-up') {
				const response = await authClient.signUp.email({
					name,
					email,
					password
				});
				if (response.error) {
					errorMessage = response.error.message ?? 'Unable to create account.';
					return;
				}
			} else {
				const response = await authClient.signIn.email({
					email,
					password
				});
				if (response.error) {
					errorMessage = response.error.message ?? 'Unable to sign in.';
					return;
				}
			}

			await goto(redirectTo, { invalidateAll: true });
		} finally {
			isSubmitting = false;
		}
	};
</script>

<svelte:head>
	<title>Sign in</title>
	<meta name="description" content="Sign in to save your watch list" />
</svelte:head>

<section class="max-w-md mx-auto mt-12">
	<h1 class="text-2xl font-semibold">Save your watch list</h1>
	<p class="text-sm text-gray-600 mt-2">Sign in to sync your picks across browsers.</p>

	<div class="mt-6 flex gap-2">
		<button
			type="button"
			class={`px-3 py-1 rounded border ${mode === 'sign-in' ? 'bg-amber-600 text-white border-amber-600' : 'border-gray-300'}`}
			onclick={() => (mode = 'sign-in')}
		>
			Sign in
		</button>
		<button
			type="button"
			class={`px-3 py-1 rounded border ${mode === 'sign-up' ? 'bg-amber-600 text-white border-amber-600' : 'border-gray-300'}`}
			onclick={() => (mode = 'sign-up')}
		>
			Create account
		</button>
	</div>

	<form
		class="mt-6 grid gap-4"
		onsubmit={(event) => {
			event.preventDefault();
			void submit();
		}}
	>
		{#if mode === 'sign-up'}
			<label class="grid gap-1">
				<span class="text-sm">Name</span>
				<input class="border rounded px-3 py-2" bind:value={name} required />
			</label>
		{/if}

		<label class="grid gap-1">
			<span class="text-sm">Email</span>
			<input class="border rounded px-3 py-2" type="email" bind:value={email} required />
		</label>

		<label class="grid gap-1">
			<span class="text-sm">Password</span>
			<input class="border rounded px-3 py-2" type="password" bind:value={password} minlength={8} required />
		</label>

		{#if errorMessage}
			<p class="text-sm text-red-700">{errorMessage}</p>
		{/if}

		<button
			type="submit"
			class="px-3 py-2 rounded bg-amber-600 text-white disabled:opacity-50"
			disabled={isSubmitting}
		>
			{isSubmitting ? 'Please wait...' : mode === 'sign-up' ? 'Create account' : 'Sign in'}
		</button>
	</form>
</section>
