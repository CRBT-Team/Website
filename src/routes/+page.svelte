<script lang="ts">
	import FeatureCard from './dashboard/FeatureCard.svelte';
	import { features } from './dashboard/_features';
</script>

<header>
	<h1>CRBT</h1>
	<h2>The Discord companion made for you.</h2>
</header>

<div class="features">
	{#each features as feature}
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
