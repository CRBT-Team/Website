<script lang="ts">
	import Card from '$lib/components/Card.svelte';

	export let flipped = false;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div on:click={() => (flipped = !flipped)} class="flip-card" class:flipped>
	<Card class="front">
		<slot name="front" />
	</Card>
	<Card class="back">
		<slot name="back" />
	</Card>
</div>

<style lang="scss">
	.flip-card {
		min-height: 150px;
		position: relative;
		transition: transform 0.6s;
		transform-style: preserve-3d;

		&.flipped {
			transform: rotateY(180deg);
		}
	}

	@media (prefers-reduced-motion) {
		.flip-card {
			transition: none;
		}
	}

	:global(.front, .back) {
		position: absolute;
		width: 100%;
		height: 100%;
		backface-visibility: hidden;
	}

	:global(.back) {
		transform: rotateY(180deg);
	}
</style>
