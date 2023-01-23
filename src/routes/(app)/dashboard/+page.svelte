<script lang="ts">
	import type { PageData } from './$types';
	import { formatGuildIconURL } from '@purplet/utils';

	export let data: PageData;
</script>

{#each data.guilds as guild}
	<img src={formatGuildIconURL(guild.id, guild.icon)} alt={guild.name} />
	<a href="/dashboard/{guild.id}">{guild.name}</a><br />
{/each}
