<script lang="ts">
	import { ArrowLeft } from 'lucide-svelte';

	export let href = '';
</script>

{#if href}
	<div class="back-btn">
		<a {href}>
			<ArrowLeft />
		</a>
	</div>
{:else}
	<button class="back-btn" on:click={() => history.back()}>
		<ArrowLeft />
	</button>
{/if}

<style lang="scss">
	.back-btn {
		padding: 1.5rem 1rem;
		appearance: none;
		background-color: inherit;
		color: inherit;
		border: none;
		cursor: pointer;
	}
</style>
