<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import { onMount } from 'svelte';

	let features: Element;
	let scrolling = true;
	let scrollFinished = false;

	import { marketingFeatures } from './_features';

	onMount(() => {
		const interval = setInterval(() => {
			let currentScroll = features?.scrollLeft + document.body.scrollWidth;
			let maxScroll = features?.scrollWidth;

			if (scrolling) {
				if (currentScroll >= maxScroll) {
					features?.scrollTo({
						left: 0,
						behavior: 'smooth'
					});
					scrollFinished = true;
				} else {
					setTimeout(
						() => {
							features?.scrollBy({
								left: 30,
								behavior: 'smooth'
							});
							scrollFinished = false;
						},
						scrollFinished ? 700 : 0
					);
				}
			}
		}, 100);

		return () => clearInterval(interval);
	});
</script>

<h1 class="section-title">And many more!</h1>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class="feature-carousel"
	bind:this={features}
	on:mouseenter={() => (scrolling = false)}
	on:mouseleave={() => (scrolling = true)}
	on:click={() => (scrolling = !scrolling)}
>
	{#each marketingFeatures as feature}
		<Card>
			<div class="card">
				<div class="top">
					{#if feature.icon}
						<div class="icon">
							<svelte:component this={feature.icon} />
						</div>
					{/if}
				</div>
				<h3>{feature.name}</h3>
				<p>{@html feature.description}</p>
			</div>
		</Card>
	{/each}
</div>

<style lang="scss">
	.section-title {
		text-align: center;
	}

	.feature-carousel {
		justify-content: start;
		display: flex;
		overflow-x: hidden;
		gap: 20px;
		padding-top: 0px;

		.card {
			width: 250px;
			display: flex;
			flex-direction: column;
			gap: 10px;
			.icon {
				color: var(--color-on-primary);
				// width: 24px;
				// height: 24px;
				border-radius: var(--border-radius-small);
				padding: 5px;
				width: min-content;
				background-color: var(--color-primary);
			}
		}
	}
</style>
