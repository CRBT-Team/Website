<script lang="ts">
	import { page } from '$app/stores';
	import type { RESTGetAPICurrentUserGuildsResult } from 'discord-api-types/v10';
	import { ChevronRight } from 'lucide-svelte';
	import { items } from './_SidebarItems';

	$: tree = $page.url.pathname.split('/').slice(1);

	export let guilds: RESTGetAPICurrentUserGuildsResult;

	let allitems = items.map((i) => i.items).flat();

	console.log($page.url);
</script>

<nav class="breadcrumbs">
	{#each tree.slice(1) as item, index}
		<h1>
			{#if index === 0}
				<a href="/{tree.slice(0, index + 2).join('/')}">
					{guilds.find((g) => g.id === item)?.name ?? allitems.find((i) => i.href === item).label}
				</a>
			{:else}
				{guilds.find((g) => g.id === item)?.name ?? allitems.find((i) => i.href === item).label}
			{/if}
		</h1>
		{#if index !== tree.length - 2}
			<ChevronRight />
		{/if}
	{/each}
	{#if tree.slice(1).length === 1}
		<ChevronRight />
		<h1>
			{allitems.find((i) => i.href === '').label}
		</h1>
	{/if}
</nav>

<style lang="scss">
	.breadcrumbs {
		display: flex;
		align-items: center;
		user-select: none;
		position: relative;
		left: -5px;
		z-index: 2;

		:last-child {
			font-weight: 600;
		}

		h1 {
			padding: 7px;
			border-radius: var(--border-radius-medium);
			opacity: 0.9;

			&:hover:not(:last-child) {
				background-color: rgba(0, 0, 0, 0.1);
				opacity: 1;
				font-weight: 400;
			}
			a {
				text-decoration: none;
				color: var(--color-on-surface);
			}
		}
	}
</style>
