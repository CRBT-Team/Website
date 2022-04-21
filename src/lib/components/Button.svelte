<script lang="ts">
	export let style: 'primary' | 'secondary' = 'primary';
	export let href: string = '';
</script>

{#if href}
	<a class="primary-button {style}" {href}>
		<slot />
	</a>
{:else}
	<button on:click class="primary-button {style}">
		<slot />
	</button>
{/if}

<style lang="scss">
	.primary-button {
		transition: 0.6s;
		overflow: hidden;
		appearance: none;
		user-select: none;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		padding: 1rem 2.5rem;
		height: 100%;
		border-radius: 99rem;
		text-decoration: none;
		font-size: 1rem;
		font-weight: 600;
		line-height: 1.25;
		text-align: left;
		cursor: pointer;
		transition: all 0.2s ease-in-out;
		&.primary {
			background-color: var(--light);
			color: var(--dark);
		}
		&.secondary {
			background-color: white;
			color: var(--dark);
		}
		&:hover {
			filter: brightness(0.9);
			transform: translateY(-0.1rem);
			box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
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
