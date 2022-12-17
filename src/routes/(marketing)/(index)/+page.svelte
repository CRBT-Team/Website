<script lang="ts">
	export const prerender = true;

	import Compare from './Compare.svelte';
	import FeaturedServers from './FeaturedServers.svelte';
	import Features from './Features.svelte';
	import Header from './Header.svelte';
</script>

<Header />

<div class="content">
	<FeaturedServers />

	<Features />

	<Compare />
</div>

<style lang="scss">
	.content {
		width: 100%;
		display: flex;
		align-items: center;
		flex-direction: column;

		> :global(*) {
			width: 100%;
			// max-width: 70rem;
			padding: 30px;
		}
	}
</style>
