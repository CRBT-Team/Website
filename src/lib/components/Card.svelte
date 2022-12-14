<div {...$$restProps} on:click>
	<slot />
</div>

<style lang="scss">
	div {
		display: flex;
		flex-direction: column;
		background-color: var(--color-surface);
		color: var(--color-on-surface);
		border-radius: var(--border-radius-medium);
		padding: 15px;
	}
</style>
