<script>
	import Button from '$lib/components/Button.svelte';
</script>

<main>
	<header>
		<h1>CRBT Event</h1>
		<h2>Coming July 2nd, 2022.</h2>
	</header>
	<Button href="https://discord.gg/yGZEPng7V5?event=930525819825176656">
		Get notified on Discord
	</Button>
	<div class="command">
		<p>Or with CRBT:</p>
		<code>/remind me when:2022-07-02T16:00:00Z subject:CRBT Event</code>
	</div>
</main>

<style lang="scss">
	main {
		display: flex;
		height: 100vh;
		width: 100%;
		flex-direction: column;
		text-align: center;
		justify-content: center;
		align-items: center;
	}

	.command {
		margin: 2rem 0;
	}
</style>
