<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import { onMount } from 'svelte';

	let featureCarousel: Element;
	let scrolling = true;
	let scrollFinished = false;

	import { marketingFeatures } from './_features';

	onMount(() => {
		const interval = setInterval(() => {
			let currentScroll = featureCarousel?.scrollLeft + document.body.scrollWidth;
			let maxScroll = featureCarousel?.scrollWidth;

			if (scrolling) {
				if (currentScroll >= maxScroll) {
					featureCarousel?.scrollTo({
						left: 0,
						behavior: 'smooth'
					});
					scrollFinished = true;
				} else {
					if (scrollFinished) {
						setTimeout(() => {
							featureCarousel?.scrollBy({
								left: 30,
								behavior: 'smooth'
							});
							scrollFinished = false;
						}, 700);
					} else {
						featureCarousel?.scrollBy({
							left: 30,
							behavior: 'smooth'
						});
					}
				}
			}
		}, 100);

		return () => clearInterval(interval);
	});
</script>

<div class="features-wrapper">
	<h1 class="section-title">And many more features!</h1>

	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		class="feature-carousel"
		bind:this={featureCarousel}
		on:mouseenter={() => (scrolling = false)}
		on:mouseleave={() => (scrolling = true)}
		on:click={() => (scrolling = !scrolling)}
	>
		{#each marketingFeatures as feature}
			<Card>
				<div class="feature">
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
</div>

<style lang="scss">
	.section-title {
		text-align: center;
		margin-bottom: 20px;
	}
	:global(.card):hover {
		.icon {
			color: var(--color-on-primary) !important;
			background-color: var(--color-primary) !important;
		}
	}

	.feature-carousel {
		justify-content: start;
		display: flex;
		overflow-x: hidden;
		gap: 1rem;
		padding: 2rem;

		.feature {
			width: 22rem;
			display: flex;
			flex-direction: column;

			h3 {
				font-size: 1.5rem;
			}

			p {
				color: var(--color-on-surface);
			}

			.icon {
				color: var(--color-primary);
				:global(svg) {
					width: 30px;
					height: 30px;
				}
				border-radius: var(--border-radius-small);
				padding: 0.5rem;
				width: min-content;
				background-color: var(--color-surface);
			}
		}
	}
</style>
