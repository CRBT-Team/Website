<script lang="ts">
	export let align: 'left' | 'right' | 'center' = 'left';
	export let className: string = '';
</script>

<section class="fancy-section {align} {className}" {...$$restProps}>
	<slot />
</section>

<style lang="scss">
	.fancy-section {
		gap: 30px;
		justify-content: space-evenly;
		padding: 2rem 100px;
		align-items: center;
		width: 100%;
		display: flex;

		&.center {
			flex-direction: column;
			justify-content: center;
			// text-align: center;
		}

		&.left {
			text-align: end;
			:global(.text) {
				align-items: flex-end;
			}
		}
		&.right {
			flex-direction: row-reverse;
		}
	}

	@media (max-width: 1200px) {
		.fancy-section {
			padding: 1rem;
			gap: 10px;
			flex-direction: column !important;
		}
	}
</style>
