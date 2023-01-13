<script>
	import AddToDiscord from '$lib/components/AddToDiscord.svelte';
	import Button from '$lib/components/Button.svelte';
	import { ChevronDown } from 'lucide-svelte';
	import AppDemo from './AppDemo/AppDemo.svelte';
</script>

<header class="hero-header">
	<div class="hero-content">
		<h2 class="tagline">
			The <i><span class="emphasis-tertiary">perfect</span></i><br />
			<span class="emphasis-primary">just-about-anything</span><br /> Discord app.
		</h2>
		<p class="descriptive-text">
			Quit the hassle with all of your different bots.<br />
			CRBT does it all in a simple, powerful and efficient solution that's easy to set up.
		</p>

		<div class="buttons">
			<AddToDiscord />

			<Button inline href="#features" style="link">
				<ChevronDown slot="icon" />
				See features
			</Button>
		</div>
	</div>

	<AppDemo />
</header>

<style lang="scss">
	.hero-header {
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		padding: 2rem 3rem;
		gap: 2rem;
		width: 100%;
		.hero-content {
			display: flex;
			flex-direction: column;
			gap: 1.5rem;
			max-width: 30rem;

			.tagline {
				font-size: 3rem;
				margin: 0;
			}

			.descriptive-text {
				font-size: 1.2rem;
				color: var(--color-on-surface);
			}

			.buttons {
				display: flex;
				align-items: center;
				gap: 1rem;
			}
		}
	}

	@media (max-width: 950px) {
		.hero-header {
			flex-direction: column;

			.hero-content {
				justify-content: center;
				align-items: center;
				text-align: center;
			}
		}

		.tagline {
			font-size: 2.5rem !important;
		}
	}
</style>
