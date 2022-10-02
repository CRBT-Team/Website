<!-- <script>
	import { UserPlus } from 'lucide-svelte';
	import Button from '$lib/components/Button.svelte';
	import '../styles/homepage.scss';
	import MetaTags from '$lib/components/MetaTags.svelte';
	import Cta from '$lib/components/CTA.svelte';
	import Section from '$lib/components/Section.svelte';
	import { features } from './_features';
	import Card from '$lib/components/Card.svelte';
</script>

<MetaTags
	description="CRBT is a Discord bot that helps you get things done quickly through user-friendly and customizable commands."
/>

<div role="main" class="content">
	<Section align="right" className="hero-header">
		<div class="text">
			<h1 class="header">
				The Discord companion <br /><span class="pink">made for you</span>.
			</h1>
			<p class="subheader">
				Quit the hassle with all of your different bots.<br />CRBT does it all in a simple, powerful
				and efficient solution that's easy to set up.
			</p>
			<div class="buttons">
				<Button href="/invite">
					<UserPlus />
					Add to Discord</Button
				>
			</div>
		</div>
	</Section>
	<div id="features" />
	<Section align="center">
		<h1 class="header">Features everything you'd expect, <span class="pink">and more</span>!</h1>

		<div class="features">
			{#each features as feature}
				<Card>
					<div class="top">
						<div class="icon">
							<svelte:component this={feature.icon} />
						</div>
						{#if feature.badge}
							<div class="label">{feature.badge}</div>
						{/if}
					</div>
					<h3>{feature.name}</h3>
					<p class="subheader">{@html feature.description}</p>
				</Card>
			{/each}
		</div>
	</Section>
	<Cta />
</div> -->
