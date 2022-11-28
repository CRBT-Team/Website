<script lang="ts">
	export let type: 'text' | 'password' = 'text';
	export let disabled = false;
	export let placeholder = '';
	export let id = Math.random().toString(36).slice(2, 9);
	export let label = '';
	export let value = '';
	export let large = false;
	export let minlength: number = null;
	export let maxlength: number = null;

	let inputEl: HTMLInputElement | HTMLTextAreaElement | null;

	function changeValue() {
		value = inputEl.value;
	}
</script>

<div class="field">
	{#if !large}
		<input
			class="input"
			{id}
			{type}
			bind:this={inputEl}
			on:input={changeValue}
			{placeholder}
			{disabled}
			{minlength}
			{maxlength}
		/>
	{:else}
		<textarea
			class="input"
			{id}
			{type}
			bind:this={inputEl}
			on:input={changeValue}
			{placeholder}
			{disabled}
			{minlength}
			{maxlength}
		/>
	{/if}
	<label for={id}>{label}</label>
</div>

<style lang="scss">
	.field {
		--textarea-start-height: 150px;

		width: 100%;
		position: relative;

		label {
			color: var(--color-on-surface-variant);

			// z-index: 1;
			user-select: none;
			cursor: text;
			left: 10px;
			padding: 0 5px;
			top: 45px;
			position: absolute;
			transform: translateY(-2rem);
			transform-origin: left center;
			transition: transform 300ms ease;
			background: var(--color-background);
		}

		textarea {
			height: var(--textarea-start-height);
			min-height: max-content;
			resize: vertical;
		}

		.input {
			outline: none;
			border: 2px solid var(--color-on-surface-variant);
			border-radius: var(--border-radius-small);
			overflow: hidden;
			margin: 0;
			width: 100%;
			padding: 15px 10px;
			background: none;
			font-size: inherit;
			font-family: inherit;
			color: inherit;
		}

		&:focus-within label,
		.input:not(:placeholder-shown) + label {
			transition: transform 300ms ease;
			transform-origin: 0%;
			transform: scale(0.8) translateY(-4.6rem);
		}

		&:focus-within {
			label {
				color: var(--color-primary);
			}
			.input {
				border: 2px solid var(--color-primary);
			}
		}
	}
</style>
