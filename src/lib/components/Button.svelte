<script lang="ts">
	export let inline = false;
	export let href: string = '';
</script>

{#if href}
	<a class="primary-button" class:inline {href}>
		<slot />
	</a>
{:else}
	<button on:click class="primary-button" class:inline>
		<slot />
	</button>
{/if}

<style lang="scss">
	.primary-button {
		text-overflow: ellipsis;
		// transition: 0.6s;
		overflow: hidden;
		appearance: none;
		user-select: none;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		color: var(--color-on-primary);
		background-color: var(--color-primary);
		gap: 1rem;
		width: 100%;
		padding: 1rem 0;
		height: min-content;
		border-radius: var(--border-radius-medium);
		text-decoration: none;
		font-size: 1rem;
		font-weight: 600;
		line-height: 1.25;
		text-align: left;
		cursor: pointer;
		// transition: all 0.2s ease-in-out;

		&:hover {
			background-color: var(--color-primary-container);
			color: var(--color-on-primary-container);
		}

		&.inline {
			width: max-content;
			padding: 1rem 2.5rem;
		}
	}

	@media (max-width: 800px) {
		.primary-button {
			padding: 1rem 1.5rem;
			font-size: 1rem;
			// width: 100%;
			font-weight: 700;
			line-height: 1.5;
		}
	}
</style>
