<script>
	export let name;

	let showGreeting = false;

	const handleClick = () => (showGreeting = true);
</script>

<button on:click={handleClick}>Greet</button>
<button on:click={() => (showGreeting = false)}>Shush</button>

{#if showGreeting}
	<p>Hello {name}</p>
{/if}
