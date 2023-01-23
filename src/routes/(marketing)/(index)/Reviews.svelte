<script lang="ts">
	import Avatar from '$lib/components/Avatar.svelte';
	import Card from '$lib/components/Card.svelte';
	import { reviews } from './_reviews';
</script>

<div class="reviews-wrapper">
	<h1 class="section-title">
		See what <span class="emphasis-primary">other Discord users</span> say about CRBT
	</h1>

	<div class="reviews">
		{#each reviews as review}
			<Card>
				<div class="review">
					<div class="text">
						{@html review.message}
					</div>

					<div class="profile">
						<Avatar size="2rem" src={review.avatar} alt="{review.username}'s avatar" />

						{review.username} on {review.source === 'topgg' ? 'Top.gg' : 'Twitter'}
					</div>
				</div>
			</Card>
		{/each}
	</div>
</div>

<style lang="scss">
	.reviews-wrapper {
		max-width: 100rem;
		padding: 2rem;
	}

	.section-title {
		text-align: center;
	}

	.reviews {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1rem;
		padding: 2rem 0;

		.review {
			display: flex;
			flex-direction: column;
			height: 100%;
			gap: 3rem;

			.text {
				font-size: 1.1rem;

				:global(b) {
					color: var(--color-primary);
				}
			}

			.profile {
				margin-top: auto;
				display: flex;
				gap: 0.5rem;
				align-items: center;
			}
		}
	}
</style>
