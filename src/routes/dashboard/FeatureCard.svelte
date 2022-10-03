<script lang="ts">
	import Switch from '$lib/components/Switch.svelte';
	import type { Feature } from './_features';

	export let feature: Feature;
</script>

<a class="feature" href={feature.href}>
	<div class="top">
		{#if feature.icon}
			<div class="icon">
				<svelte:component this={feature.icon} />
			</div>
		{/if}
		{#if feature.isToggleable}
			<Switch checked={true} style="--thumb-size: 1rem;" />
		{/if}
	</div>
	<h3>{feature.name}</h3>
	<p>{@html feature.description}</p>
</a>

<style lang="scss">
	.feature {
		padding: 10px;
		border-radius: var(--border-radius-medium);
		color: var(--color-on-surface);
		background-color: var(--color-surface);
		user-select: none;

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
