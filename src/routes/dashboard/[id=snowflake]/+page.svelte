<script lang="ts">
	import { features } from '../_features';
	import FeatureCard from '$lib/components/FeatureCard.svelte';
</script>

<div class="features">
	{#each features.filter(({ href, isToggleable }) => href || isToggleable) as feature}
		<FeatureCard {feature} />
	{/each}
</div>

<style lang="scss">
	.features {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 10px;
	}
</style>
