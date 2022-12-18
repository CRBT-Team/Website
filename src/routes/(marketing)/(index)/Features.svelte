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
					if (scrollFinished) {
						setTimeout(() => {
							features?.scrollBy({
								left: 20,
								behavior: 'smooth'
							});
							scrollFinished = false;
						}, 700);
					} else {
						features?.scrollBy({
							left: 20,
							behavior: 'smooth'
						});
					}
				}
			}
		}, 100);

		return () => clearInterval(interval);
	});
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class="features"
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
	.features {
		justify-content: start;
		display: flex;
		overflow-x: hidden;
		gap: 20px;

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
