<script lang="ts">
	import { page } from '$app/stores';
	import type { RESTAPIPartialCurrentUserGuild } from 'discord-api-types/v10';
	import { items } from './_SidebarItems';
	import Crbt from '$lib/svg/crbt.svelte';

	export let currentGuild: RESTAPIPartialCurrentUserGuild;
	$: selectedItem = $page.url.pathname
		.replace(`/dashboard/${currentGuild.id}`, '')
		.replace('/', '');
</script>

<aside class="main-sidebar">
	<div class="heading-logo">
		<Crbt />
	</div>

	{#each items as group}
		<div class="item group">
			<p class="item-label">
				{group.label}
			</p>
		</div>
		{#each group.items as item}
			{#if item.href !== undefined}
				<a
					class="item"
					on:click={() => selectedItem === item.href}
					class:selected={selectedItem === item.href}
					href="/dashboard/{currentGuild.id}/{item.href}"
				>
					<svelte:component this={item.icon} class="item-icon" />
					<p class="item-label">
						{item.label}
					</p>
				</a>
			{/if}
		{/each}
	{/each}
</aside>

<style lang="scss">
	.main-sidebar {
		width: 330px;
		background-color: var(--color-surface);
		display: flex;
		flex-direction: column;
		overflow-y: hidden;
		z-index: 1;
		gap: 3px;

		.heading-logo {
			fill: var(--color-on-surface);
			padding: 30px;

			:global(svg) {
				height: 40px;
			}
		}

		.item {
			border-radius: 999px;
			display: flex;
			color: var(--color-on-surface);
			text-decoration: none;
			align-items: center;
			margin: 0 10px;
			font-size: 16px;
			padding: 13px 25px;
			gap: 15px;
			opacity: 0.7;
			user-select: none;

			.item-label {
				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden;
			}

			:global(svg) {
				stroke-width: 1.5;
				position: relative;
				transition: transform 0.2s ease-in, stroke 0.2s;
				transform: translateX(0);
			}

			&:hover:not(.group) {
				background-color: var(--color-surface-variant);
			}

			&.selected {
				font-weight: 700;
				background-color: var(--color-secondary-container);
				opacity: 1;

				:global(svg) {
					transition: stroke 0.2s;
					stroke-width: 2.5;
				}
			}

			&.group {
				text-transform: uppercase;

				.item-label {
					font-weight: 700;
				}
			}
		}
	}
</style>
