<script lang="ts">
	import type { RESTGetAPICurrentUserGuildsResult } from 'discord-api-types/v10';
	import Breadcrumbs from './Breadcrumbs.svelte';

	export let guilds: RESTGetAPICurrentUserGuildsResult;
</script>

<header class="top-navbar">
	<Breadcrumbs {guilds} />
</header>

<style lang="scss">
	.top-navbar {
		width: 100%;
		padding-bottom: 20px;
		padding-top: 45px;

		display: flex;
		background-color: var(--color-surface);
	}
</style>
