<script lang="ts">
	export let href = '';
	let className = '';
	export { className as class };
</script>

{#if href}
	<a {href} class="card {className}" {...$$restProps} on:click>
		<slot />
	</a>
{:else}
	<div class="card {className}" {...$$restProps} on:click>
		<slot />
	</div>
{/if}

<style lang="scss">
	.card {
		display: flex;
		flex-direction: column;
		border: 1px solid var(--color-surface-variant);
		border-radius: var(--border-radius-medium);
		background-color: var(--color-background);
		padding: 1.2rem;
		transition: box-shadow 0.2s ease-in-out, background-color 0.2s ease-in-out;
		box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 0px;

		&:hover {
			box-shadow: rgba(0, 0, 0, 0.3) 0px 3px 6px;
			transition: box-shadow 0.2s ease-in-out, background-color 0.2s ease-in-out;
			background-color: var(--color-surface);
			color: var(--color-on-surface);
			border: 1px solid var(--color-surface);
		}
	}
</style>
