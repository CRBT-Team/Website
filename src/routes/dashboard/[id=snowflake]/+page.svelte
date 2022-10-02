<script lang="ts">
	import { features } from '../_features';
	import FeatureCard from '../FeatureCard.svelte';
	import type { PageParentData } from './$types';
	import { page } from '$app/stores';

	export let data: PageParentData;

	$: currentGuild = data.guilds.find((g) => g.id === $page.params.id);
</script>

<h1>{currentGuild.name} / Overview</h1>

<div class="features">
	{#each features.filter(({ href, isToggleable }) => href || isToggleable) as feature}
		<FeatureCard {feature} />
	{/each}
	{#each features.filter(({ href, isToggleable }) => href || isToggleable) as feature}
		<FeatureCard {feature} />
	{/each}
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
