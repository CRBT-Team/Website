<script>
	import AddToDiscord from './AddToDiscord.svelte';
</script>

<div class="cta">
	<h2>
		Invite CRBT and make your Discord server <span class="emphasis-tertiary"
			><i>stand out</i>
		</span>
		<br />
		<span class="emphasis-primary">all for free, forever</span>.
	</h2>
	<AddToDiscord />
</div>

<style lang="scss">
	.cta {
		background-color: var(--color-surface);
		color: var(--color-on-surface);
		display: flex;
		gap: 1rem;
		padding: 3rem;
		align-items: center;
		justify-content: space-around;
		text-align: center;
		flex-direction: column;
	}
</style>
