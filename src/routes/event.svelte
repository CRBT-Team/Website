<script>
	import Button from '$lib/components/Button.svelte';
	import Section from '$lib/components/Section.svelte';

	const now = new Date().getTime();
	let countDownDate = 1657368000000;

	const dev = import.meta.env.DEV;

	let distance = countDownDate - now;
	let done = false;
	$: hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	$: minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	$: seconds = Math.floor((distance % (1000 * 60)) / 1000);

	const x = setInterval(() => {
		distance -= 1000;

		if (distance < 0) {
			clearInterval(x);
			done = true;
		}
	}, 1000);
</script>

{#if !done}
	<Section align="center">
		<header>
			<h1>Bigger, better, bolder</h1>

			<p>
				Join us for a new event live where we'll unveil what's been in the works for CRBT and
				Purplet, as well as some extra announcements!
			</p>

			<h2>
				In {hours}
				{hours === 1 ? 'hour' : 'hours'}, {minutes}
				{minutes === 1 ? 'minute' : 'minutes'} and {seconds}
				{seconds === 1 ? 'second' : 'seconds'}
			</h2>
		</header>

		<Button href="https://discord.gg/AvwhNtsgAC?event=930525819825176656">
			Get notified on Discord
		</Button>
	</Section>
{:else}
	<Section align="center">
		<iframe
			title="CRBT Event"
			src="https://player.twitch.tv/?channel=clembs&parent={!dev ? 'crbt.app' : '127.0.0.1'}"
			height="720"
			width="100%"
			allowfullscreen
		/>
	</Section>

	<Section align="right">
		<header>
			<h1>Bigger, better, bolder</h1>

			<p>
				Join us for a new event live where we'll unveil what's been in the works for CRBT and
				Purplet, as well as some extra announcements!
			</p>
			<Button href="https://discord.gg/AvwhNtsgAC">Join us on Discord</Button>
		</header>
	</Section>
{/if}
