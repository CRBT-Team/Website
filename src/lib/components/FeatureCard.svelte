<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Switch from '$lib/components/Switch.svelte';
	import type { Feature } from '../../routes/dashboard/_features';

	export let feature: Feature;
</script>

<div class="feature" on:click={() => goto(`/dashboard/${$page.params.id}/${feature.href}`)}>
	<div class="top">
		{#if feature.icon}
			<div class="icon">
				<svelte:component this={feature.icon} />
			</div>
		{/if}
		{#if feature.isToggleable}
			<div on:click={(e) => e.stopPropagation()}>
				<Switch checked={true} style="--thumb-size: 1rem;" />
			</div>
		{/if}
	</div>
	<h3>{feature.name}</h3>
	<p>{@html feature.description}</p>
</div>

<style lang="scss">
	.feature {
		padding: 10px;
		border-radius: var(--border-radius-medium);
		color: var(--color-on-surface);
		background-color: var(--color-surface);
		user-select: none;
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
				user-select: none;
			}
		}
	}
</style>
