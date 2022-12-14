<script>
	import Button from '$lib/components/Button.svelte';
	import Discord from '$lib/svg/brands/discord.svelte';
	import { ChevronDown } from 'lucide-svelte';
</script>

<header class="hero-header">
	<div class="hero-content">
		<h2 class="tagline">
			The <span class="emphasis-tertiary">perfect</span><br />
			<span class="emphasis-primary">just-about-anything</span><br /> Discord app.
		</h2>
		<p class="descriptive-text">
			Quit the hassle with all of your different bots.<br />
			CRBT does it all in a simple, powerful and efficient solution that's easy to set up.
		</p>

		<div class="buttons">
			<Button inline href="/invite">
				<Discord slot="icon" />
				Add to Discord
			</Button>
			<Button inline href="#features" style="secondary">
				<ChevronDown slot="icon" />
				See features
			</Button>
		</div>
	</div>
</header>

<style lang="scss">
	.hero-header {
		display: flex;
		justify-content: center;
		align-items: center;

		.hero-content {
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			gap: 20px;
			max-width: 40rem;
			text-align: center;
			margin: 60px 40px;

			.tagline {
				font-size: 3.75rem;
				margin: 0;
			}

			.descriptive-text {
				font-size: 1.4rem;
			}

			.buttons {
				display: flex;
				gap: 10px;
			}
		}
	}

	@media (max-width: 800px) {
		.tagline {
			font-size: 3rem !important;
		}
	}
</style>
