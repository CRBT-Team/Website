<script lang="ts">
	export const prerender = true;

	import FeaturedServers from './FeaturedServers.svelte';
	import FeatureCarousel from './FeatureCarousel.svelte';
	import Header from './Header.svelte';
	import Feature from './Feature.svelte';
	import MetaTags from '$lib/components/MetaTags.svelte';
</script>

<MetaTags />

<Header />

<div class="content">
	<FeaturedServers />

	<!-- svelte-ignore a11y-missing-content -->
	<a name="features" />

	<Feature
		title="Wave hi to your new Discord members"
		description="Use your welcome message to convey concise information about your server's theme, events and guidelines. Customize it with CRBT's branding options to make your server stand out, or keep things simple."
		imageUrl="/assets/welcome.svg"
		position="left"
	/>

	<FeatureCarousel />

	<!-- <Compare /> -->
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
