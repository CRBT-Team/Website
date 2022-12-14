<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import { onMount } from 'svelte';

	let features: Element;
	let scrolling = true;

	import { marketingFeatures } from './_features';

	onMount(() => {
		setInterval(() => {
			if (scrolling) {
				let maxScroll = features.scrollWidth;
				let currentScroll = features.scrollLeft;
				console.log(currentScroll, maxScroll);
				if (currentScroll > maxScroll) {
					features.scrollTo({
						left: 0,
						behavior: 'smooth'
					});
				} else {
					features.scrollBy({
						behavior: 'smooth',
						left: 10
					});
				}
			}
		}, 100);
	});
</script>

<div
	class="features"
	bind:this={features}
	on:mouseenter={() => (scrolling = false)}
	on:mouseleave={() => (scrolling = true)}
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
		overflow-x: scroll;
		gap: 20px;

		.card {
			width: 250px;
			display: flex;
			flex-direction: column;
			gap: 10px;
			.icon {
				color: var(--color-on-primary-container);
				// width: 24px;
				// height: 24px;
				border-radius: var(--border-radius-small);
				padding: 5px;
				width: min-content;
				background-color: var(--color-primary-container);
			}
		}
	}
</style>
