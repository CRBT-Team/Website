<script lang="ts">
	export let inline = false;
	export let href: string = '';
	export let style: 'primary' | 'secondary' | 'tertiary' | 'link' = 'primary';
	export let disabled = false;
</script>

{#if disabled}
	<button class="button {style}" class:disabled class:inline>
		<slot name="icon" />
		<slot />
	</button>
{:else if href}
	<a class="button {style}" class:disabled class:inline {href}>
		<slot name="icon" />
		<slot />
	</a>
{:else}
	<button class="button {style}" class:disabled class:inline on:click on:submit>
		<slot name="icon" />
		<slot />
	</button>
{/if}

<style lang="scss">
	.button {
		&.primary {
			--button-bg: var(--color-primary);
			--button-text: var(--color-on-primary);
			--button-bg-hover: var(--color-primary-container);
			--button-text-hover: var(--color-on-primary-container);
		}
		&.secondary {
			--button-bg: var(--color-secondary);
			--button-text: var(--color-on-secondary);
			--button-bg-hover: var(--color-secondary-container);
			--button-text-hover: var(--color-on-secondary-container);
		}
		&.tertiary {
			--button-bg: var(--color-tertiary);
			--button-text: var(--color-on-tertiary);
			--button-bg-hover: var(--color-tertiary-container);
			--button-text-hover: var(--color-on-tertiary-container);
		}
		&.disabled {
			cursor: not-allowed;
			opacity: 0.5;
		}
		&.link {
			--button-bg: transparent;
			--button-text: var(--color-secondary);
			--button-bg-hover: var(--color-surface-variant);
			--button-text-hover: var(--color-on-surface-variant);

			padding: 0.5rem 1rem !important;
			gap: 0.5rem;
			&:hover:not(.disabled) {
				box-shadow: 0px 0px 0px;
				background-color: var(--button-bg-hover);
				color: var(--button-text-hover);
			}
		}

		text-overflow: ellipsis;
		// transition: 0.6s;
		overflow: hidden;
		appearance: none;
		user-select: none;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		color: var(--button-text);
		background-color: var(--button-bg);
		gap: 1rem;
		width: 100%;
		border: none;
		font-family: inherit;
		padding: 1rem 0;
		height: min-content;
		border-radius: var(--border-radius-medium);
		text-decoration: none;
		font-size: 1.1rem;
		font-weight: 600;
		line-height: 1.25;
		text-align: left;
		cursor: pointer;
		transition: box-shadow 0.2s ease-in-out;
		box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 0px;

		&:hover:not(.disabled) {
			transition: box-shadow 0.2s ease-in-out;
			box-shadow: rgba(0, 0, 0, 0.3) 0px 3px 6px;
		}

		:global(svg) {
			// fill: currentColor;
			width: 24px;
			height: 24px;
		}

		&.inline {
			max-width: max-content;
			padding: 1rem 2rem;
		}
	}

	@media (prefers-contrast: more) {
		.button {
			border: 2px solid;
		}
	}
	@media (max-width: 800px) {
		.button {
			padding: 1rem 1.5rem;
			font-size: 1rem;
			// width: 100%;
			line-height: 1.5;
		}
	}
</style>
