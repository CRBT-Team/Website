<script lang="ts">
	export const prerender = true;

	import FeaturedServers from './FeaturedServers.svelte';
	import FeatureCarousel from './FeatureCarousel.svelte';
	import Header from './Header.svelte';
	import Feature from './Feature.svelte';
	import MetaTags from '$lib/components/MetaTags.svelte';
	import Cta from '$lib/components/CTA.svelte';
	import { onDestroy, onMount } from 'svelte';
	import Reviews from './Reviews.svelte';

	let mainFeatures: HTMLDivElement;
	let observer: IntersectionObserver;

	onMount(() => {
		observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add('show');
				}
			});
		});

		for (const feature of mainFeatures.children) {
			observer.observe(feature);
		}
	});

	onDestroy(() => {
		if (observer) observer.disconnect();
	});
</script>

<MetaTags />

<Header />

<div class="content">
	<FeaturedServers />

	<!-- svelte-ignore a11y-missing-content -->
	<!-- <a name="features" /> -->

	<div id="features" bind:this={mainFeatures} class="main-features">
		<Feature
			featureName="Welcome & Farewell messages"
			title="Wave hi to your new Discord members!"
			description="Use your welcome message to convey concise information about your server's theme, events and guidelines. Customize it with CRBT's branding options to make your server stand out, or keep things simple."
			imageUrl="/assets/welcome.svg"
			position="left"
		/>
		<Feature
			featureName="Polls, Giveaways, Role Pickers"
			title="Create delightful experiences for your users."
			description="CRBT includes brilliantly crafted tools to help you interact with your community, like gathering their opinion with dynamic Polls, or rewarding them with Giveaways."
			imageUrl="/assets/main-features.svg"
			position="right"
		/>
		<Feature
			featureName="Utilities & Automation"
			title="Get work done faster, within Discord."
			description="The Discord bot integrates a few helpful commands to get information quickly. The Search command allows browsing the Internet with the people you're chatting with, while Reminders can be great to plan the work ahead."
			imageUrl="/assets/utilities.svg"
			position="left"
		/>
		<Feature
			featureName="Privacy first"
			title="Because you don't have to be the product."
			description="We have a clear goal to make our data collection policies transparent, and we give you the tools to change how we operate for you. And because your data is yours, you're free to download or erase everything whenever you want."
			imageUrl="/assets/privacy.svg"
			position="right"
		/>
	</div>

	<FeatureCarousel />

	<Reviews />

	<Cta />

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
		}

		.main-features {
			display: flex;
			flex-direction: column;
			gap: 5rem;
			max-width: 80rem;
			align-items: center;
			padding: 5rem;
		}
	}

	@media (max-width: 800px) {
		.main-features {
			padding: 2rem !important;
		}
	}
</style>
