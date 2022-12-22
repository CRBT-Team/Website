<script lang="ts">
	import IconButton from './IconButton.svelte';

	export let href = '';
</script>

{#if href}
	<IconButton {href} />
{:else}
	<IconButton
		on:click={() => {
			if (!href) history.back();
		}}
	/>
{/if}
