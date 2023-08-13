<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import FlipCard from '$lib/components/FlipCard.svelte';
	import { marketingFeatures } from '../_features';

	let expandedCard: (typeof marketingFeatures)[number]['name'] = null;
</script>

<div class="features-wrapper">
	<h1 class="section-title">And many more features!</h1>

	<div class="feature-grid">
		{#each marketingFeatures as feature}
			<FlipCard
				flipped={expandedCard === feature.name}
				on:click={() => (expandedCard = feature.name)}
			>
				<div class="feature" slot="front">
					<div class="inner">
						<div class="top">
							<div class="icon">
								<svelte:component this={feature.icon} />
							</div>
						</div>
						<h3>{feature.name}</h3>
					</div>
				</div>
				<div class="feature" slot="back">
					<div class="inner">
						<h3>{feature.name}</h3>
						<p>{@html feature.description}</p>
					</div>
				</div>
			</FlipCard>
		{/each}
	</div>
</div>

<style lang="scss">
	.features-wrapper {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		align-items: center;
		max-width: 100rem;
		padding: 2rem;
	}
	.feature-grid {
		display: grid;
		gap: 1rem;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		width: 100%;

		.feature {
			height: 100%;
			display: flex;
			.inner {
				display: flex;
				flex-direction: column;
				align-items: center;
				gap: 1rem;
			}
			flex-direction: column;
			justify-content: center;

			h3 {
				font-size: 1.5rem;
				margin: 0;
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
