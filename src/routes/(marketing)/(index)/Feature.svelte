<script lang="ts">
	export let featureName: string;
	export let title: string;
	export let description: string;
	export let imageUrl: string;
	export let position: 'left' | 'right';
</script>

<div class="feature {position}">
	<img class="image" alt={title} src={imageUrl} />

	<div class="feature-content">
		<span class="feature-name">{featureName}</span>
		<h1 class="title">{title}</h1>
		<p class="description">{description}</p>
		<!-- <AddToDiscord /> -->
	</div>
</div>

<style lang="scss">
	@media (prefers-reduced-motion) {
		.feature {
			transition: none;
		}
	}

	.feature {
		display: flex;
		gap: 4rem;
		max-width: 100rem;
		align-items: center;
		transition: transform 0.3s ease-in, opacity 0.2s ease-in;
		opacity: 0;
		transform: translateY(10rem);

		&.show {
			opacity: 1;
			transform: translateY(0%);
		}

		.image {
			max-width: 100%;
			min-width: 40%;
		}

		&.left {
			flex-direction: row;
		}
		&.right {
			flex-direction: row-reverse;
		}

		.feature-content {
			display: flex;
			flex-direction: column;

			.feature-name {
				padding: 0.5rem;
				width: max-content;
				background-color: var(--color-surface);
				border-radius: var(--border-radius-small);
			}

			.title {
				font-size: 2.3rem;
				margin-top: 1rem;
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
