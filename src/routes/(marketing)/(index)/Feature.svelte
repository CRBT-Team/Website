<script lang="ts">
	export let title: string;
	export let description: string;
	export let imageUrl: string;
	export let position: 'left' | 'right';
</script>

<div class="feature {position}">
	<img class="image" alt={title} src={imageUrl} />

	<div class="text">
		<h1 class="title">{title}</h1>
		<p class="description">{description}</p>
	</div>
</div>

<style lang="scss">
	.feature {
		display: flex;
		gap: 50px;
		max-width: 100rem;
		align-items: center;

		.image {
			max-width: 100%;
			min-width: 50%;
		}

		&.left {
			flex-direction: row;
		}
		&.right {
			flex-direction: row-reverse;
		}

		.text {
			.title {
				font-size: 2.3rem;
				margin-bottom: 2rem;
			}
			.description {
				font-size: 1.2rem;
				color: var(--color-on-surface);
			}
		}
	}

	@media (max-width: 800px) {
		.feature {
			flex-direction: column !important;
		}
	}
</style>
