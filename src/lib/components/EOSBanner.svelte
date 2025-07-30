<div class="eos-banner">
	<p>
		Support for CRBT is ending in September 2025.
		<a href="https://docs.crbt.app/blog/end-of-life" aria-label="Visit CRBT Docs to learn more"
			>Learn more</a
		>.
	</p>
</div>

<style lang="scss">
	.eos-banner {
		display: grid;
		place-items: center;
		position: sticky;

		background-image: repeating-linear-gradient(
			45deg,
			var(--palette-primary30) 0,
			var(--palette-primary30) 10px,
			transparent 0,
			transparent 50%
		);
		background-size: 35px 35px;

		background-color: var(--palette-primary40);
		color: var(--palette-primary100);

		top: 0;
		left: 0;
		width: 100%;
		height: 5rem;
		z-index: 9;
		padding: 1rem;

		text-align: center;
		font-size: 1.25rem;
		font-weight: 600;
	}
</style>
