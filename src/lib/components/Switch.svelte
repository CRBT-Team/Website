<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let id: string = null;
	export let label: string = '';
	export let style = '';

	export let disabled = false;
	export let checked = true;

	const dispatch = createEventDispatcher();

	function toggle() {
		if (disabled) return;
		checked = !checked;

		dispatch('toggle', checked);
	}
</script>

<div class="switch" on:click={toggle}>
	<label for={id} {style}>
		{label}
	</label>
	<input {id} type="checkbox" role="switch" aria-checked={checked} {disabled} bind:checked />
</div>

<style lang="scss">
	.switch {
		--thumb-size: 1.5rem;
		--thumb-highlight: hsla(0, 0%, 0%, 0.25);
		--track-size: calc(var(--thumb-size) * 2.25);
		--track-padding: 5px;

		--thumb-color-active: var(--color-on-primary);
		--track-color-active: var(--color-primary);

		--thumb-color-highlight: var(--thumb-highlight);

		--thumb-color-inactive: var(--color-on-surface-variant);
		--track-color-inactive: var(--color-surface-variant);

		--isLTR: 1;
		cursor: pointer;
		display: flex;
		justify-content: space-between;
		gap: 10px;
		align-items: center;

		input {
			--thumb-position: 0%;
			--thumb-transition-duration: 0.25s;
			padding: var(--track-padding);
			background: var(--track-color-inactive);
			inline-size: var(--track-size);
			block-size: var(--thumb-size);
			border-radius: var(--track-size);
			border: 2px solid var(--thumb-color-inactive);
			-webkit-appearance: none;
			-moz-appearance: none;
			appearance: none;
			pointer-events: none;
			touch-action: pan-y;
			// border: none;
			outline-offset: 5px;
			box-sizing: content-box;
			flex-shrink: 0;
			display: grid;
			align-items: center;
			grid: [track] 1fr / [track] 1fr;
			transition: background-color 0.25s ease;
			outline: none;

			// &:hover {
			// 	::before {
			// 		scale: 1.1;
			// 	}
			// }

			&::before {
				@media (prefers-reduced-motion: no-preference) {
					transition: transform var(--thumb-transition-duration) ease, box-shadow 0.25s ease;
				}
				content: '';
				cursor: pointer;
				pointer-events: auto;
				grid-area: track;
				inline-size: var(--thumb-size);
				block-size: var(--thumb-size);
				background: var(--thumb-color-inactive);
				box-shadow: 0 0 0 var(--highlight-size) var(--thumb-color-highlight);
				border-radius: 50%;
				transform: translateX(var(--thumb-position));
			}

			&:checked {
				background: var(--track-color-active);
				--thumb-position: calc((var(--track-size) - 100%) * var(--isLTR));
				border: 2px solid var(--track-color-active);

				&::before {
					background: var(--thumb-color-active);
				}
			}
		}
	}
</style>
