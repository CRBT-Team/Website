<div class="loading">
	<span class="dot" style="--delay: 1" />
	<span class="dot" style="--delay: 2" />
	<span class="dot" style="--delay: 3" />
</div>

<style lang="scss">
	@keyframes bounce {
		0% {
			transform: scale(1);
			background-color: var(--color-surface);
		}
		50% {
			transform: scale(2);
			background-color: var(--color-on-background);
		}
		100% {
			transform: scale(1);
			background-color: var(--color-surface);
		}
	}

	.loading {
		display: inline-flex;
		gap: 0.3rem;
		align-items: center;
		height: auto;
	}

	.dot {
		width: 0.2rem;
		height: 0.2rem;
		border-radius: 1rem;
		animation: bounce infinite 1.5s ease-in-out calc(100ms * calc((var(--delay) * 2)));
	}
</style>
