<script lang="ts">
	import { page } from '$app/stores';
	import MainSidebar from './MainSidebar.svelte';
	import TopNavbar from './TopNavbar.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	$: currentGuild = data.guilds.find((g) => g.id === $page.params.id);
</script>

<div class="root">
	{#if $page.params.id}
		<MainSidebar {currentGuild} />
	{/if}
	<div class="layout">
		<TopNavbar guilds={data.guilds} />
		<main class="content">
			<slot />
		</main>
	</div>
</div>

<style lang="scss">
	.root {
		display: flex;
		height: 100vh;

		.layout {
			display: flex;
			flex-direction: column;
			background-color: var(--color-surface);
			width: 100%;
			flex: 1;

			.content {
				background-color: var(--color-background);
				border-radius: 15px;
				height: 100%;
				margin: 0 15px 15px 0;
				padding: 30px;
				display: flex;
				flex-direction: column;
				align-items: center;
				overflow-y: scroll;
			}
		}
	}
</style>
