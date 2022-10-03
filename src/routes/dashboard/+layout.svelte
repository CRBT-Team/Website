<script lang="ts">
	import { page } from '$app/stores';
	import GuildSidebar from '$lib/components/layout/GuildSidebar.svelte';
	import MainSidebar from '$lib/components/layout/MainSidebar.svelte';
	import TopNavbar from '$lib/components/layout/TopNavbar.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	let hideMainSidebar = false;
	$: currentGuild = data.guilds.find((g) => g.id === $page.params.id);
</script>

<div class="root">
	<TopNavbar
		guilds={data.guilds}
		on:menu={({ detail: newState }) => (hideMainSidebar = newState)}
	/>
	<div class="layout">
		<GuildSidebar guilds={data.guilds} />
		{#if $page.params.id}
			<MainSidebar {currentGuild} hide={hideMainSidebar} />
		{/if}
		<main class="content">
			<slot />
		</main>
	</div>
</div>

<style lang="scss">
	div.root {
		display: flex;
		flex-direction: column;
		height: 100vh;

		.layout {
			display: flex;
			background-color: var(--color-surface);
			width: 100%;
			height: 0;
			flex: 1;
			.content {
				background-color: var(--color-background);
				width: 100%;
				border-radius: 20px;
				margin: 10px;
				padding: 15px;
				overflow-y: scroll;
			}
		}
	}
</style>
