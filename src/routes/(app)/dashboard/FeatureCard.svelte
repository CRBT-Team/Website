<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import type { Feature } from './_features';
	import Card from '../../../lib/components/Card.svelte';

	export let feature: Feature;
</script>

<Card on:click={() => goto(`/dashboard/${$page.params.id}/${feature.href}`)}>
	<div class="top">
		{#if feature.icon}
			<div class="icon">
				<svelte:component this={feature.icon} />
			</div>
		{/if}
	</div>
	<h3>{feature.name}</h3>
	<p>{@html feature.description}</p>
</Card>

<style lang="scss">
	:global(.card) {
		cursor: pointer;

		.top {
			display: flex;
			justify-content: space-between;

			.icon {
				border-radius: 99rem;
				background-color: var(--color-secondary);
				color: var(--color-on-secondary);
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 99rem;
				width: max-content;
				padding: 0.6rem;
			}
		}
	}
</style>
