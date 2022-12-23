<script lang="ts">
	import { ArrowLeft } from 'lucide-svelte';
	import IconButton from './IconButton.svelte';

	export let href = '';
</script>

{#if href}
	<IconButton {href}>
		<ArrowLeft slot="icon" />
	</IconButton>
{:else}
	<IconButton on:click={() => history.back()}>
		<ArrowLeft slot="icon" />
	</IconButton>
{/if}
