<script lang="ts">
	import Wordmark from '$lib/svg/wordmark.svelte';
	import type { RESTGetAPICurrentUserGuildsResult } from 'discord-api-types/v10';
	import { Menu } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';
	import Breadcrumbs from './Breadcrumbs.svelte';

	let hideSidebar = false;
	export let guilds: RESTGetAPICurrentUserGuildsResult;

	const dispatchMenuBtn = createEventDispatcher();
</script>

<header class="top-navbar">
	<button
		class="menu-button"
		on:click={() => {
			hideSidebar = !hideSidebar;
			dispatchMenuBtn('menu', hideSidebar);
		}}
	>
		<Menu size={20} stroke="2" />
	</button>

	<div class="heading-logo">
		<Wordmark />
	</div>

	<Breadcrumbs {guilds} />
</header>

<style lang="scss">
	.top-navbar {
		width: 100%;
		height: 60px;
		display: flex;
		background-color: var(--color-surface);

		.menu-button {
			display: flex;
			background-color: var(--color-secondary-container);
			align-items: center;
			justify-content: center;
			// height: 60px;
			padding: 0 24px;
			cursor: pointer;
			// border-bottom: 2px solid var(--color-outline);

			:global(&:active svg) {
				width: 12px;
			}
		}

		.heading-logo {
			display: flex;
			height: 60px;
			width: 256px;
			fill: var(--color-on-surface);
			align-items: center;

			:global(svg) {
				height: 40px;
				width: 100%;
				left: -24px;
				position: relative;
			}
		}
	}
</style>
