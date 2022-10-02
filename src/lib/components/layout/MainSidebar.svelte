<script lang="ts">
	import { page } from '$app/stores';
	import type { RESTAPIPartialCurrentUserGuild } from 'discord-api-types/v10';
	import { items } from './_SidebarItems';

	export let currentGuild: RESTAPIPartialCurrentUserGuild;
	$: selectedItem = $page.url.pathname
		.replace(`/dashboard/${currentGuild.id}`, '')
		.replace('/', '');

	export let hide = false;
</script>

<div class="main-sidebar" class:hide>
	{#each items as group}
		<div class="item group">
			<p class="item-label">
				{group.label.replace('<servername>', currentGuild.name)}
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
</div>

<style lang="scss">
	.main-sidebar {
		width: 0px;
		min-width: 256px;
		background-color: var(--color-surface);
		display: flex;
		flex-direction: column;

		transition-duration: 200ms;
		transition-delay: 0ms;
		// transition: width 0.2s ease-in;
		overflow-y: hidden;
		z-index: 1;
		flex-grow: 1;

		&.hide {
			// transform: translateX(-100%);

			min-width: 0px;
			visibility: hidden;
			// transition: width 0.2s ease-out;
			transition-duration: 200ms;
			transition-delay: 0ms;

			.item {
				transition: transform 0.2s ease-out, opacity 0.15s ease-out;
				transform: translateX(-20%);
				opacity: 0;

				:global(svg) {
					transition: transform 0.2s ease-out;
					transform: translateX(-20%);
				}
			}
		}

		.item {
			transition: transform 0.2s ease-in, opacity 0.15s ease-in;
			overflow: hidden;
			transform: translateX(0);
			border-radius: 20px;
			display: flex;
			color: var(--color-on-surface);
			text-decoration: none;
			align-items: center;
			margin: 0 8px;
			padding: 0px 20px;
			gap: 10px;

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
