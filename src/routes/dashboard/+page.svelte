<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

{#each data.guilds as guild}
	<a href="/dashboard/{guild.id}">{guild.name}</a><br />
{/each}
