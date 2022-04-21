<script>
	import { UserPlus, ChevronDown } from 'lucide-svelte';
	import Button from '$lib/components/Button.svelte';

	import MetaTags from '$lib/components/MetaTags.svelte';
</script>

<MetaTags
	description="CRBT is a Discord bot that helps you get things done quickly through user-friendly and customizable commands."
/>

<div role="main" class="content">
	<section class="align-right hero-header">
		<div class="hero-background image">
			<img src="/assets/hero-image.png" alt="CRBT ultra cool" />
		</div>
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
				<Button style="secondary" href="#features">
					<ChevronDown /> See features</Button
				>
			</div>
		</div>
	</section>
	<section class="align-left" id="features">
		<div class="image">
			<img src="/assets/slash-commands.svg" alt="CRBT showing slash command autocomplete options" />
		</div>
		<div class="text">
			<h1 class="header">Less reading, <span class="pink">more doing</span>.</h1>
			<p class="subheader">
				No more checking the documentation before using a command because <em>that</em> argument
				doesn't go
				<em>there</em>. Just right click a message or a user, or type / and get to write commands
				with autocomplete and error checking as you type.
			</p>
		</div>
	</section>
	<section class="align-right">
		<div class="image">
			<img src="/assets/localization.svg" alt="CRBT showing slash command autocomplete options" />
		</div>
		<div class="hero-text">
			<h1 class="header">(maybe) Speaks <span class="pink">your language</span>.</h1>
			<p class="subheader">
				We've added full support for localization within commands in English (US) Spanish, French,
				German and Russian. Partial support for English (UK) and Vietnamese is also available. All
				of it is possible thanks to our <a href="/credits">collaborators</a>.
			</p>
		</div>
	</section>
	<section class="align-left">
		<div class="image">
			<img
				loading="lazy"
				src="/assets/role-pickers.svg"
				alt="CRBT showing slash command autocomplete options"
			/>
		</div>
		<div class="text">
			<div class="label">NEW</div>
			<h1 class="header">
				Self-assignable roles, evolved.<br />
				Introducing <span class="pink">Role Pickers</span>.
			</h1>
			<p class="subheader">
				Because "reaction roles" are inefficient, slow and janky, we use modern components from
				Discord as a greater and prettier alternative that enables full customization, so that
				members of your server can freely assign themselves some roles!
			</p>
		</div>
	</section>
	<section class="cta">
		<h1 class="header">
			Enhance your Discord experience and make your server engaging, <br /><span class="pink"
				>all for free, forever</span
			>.
		</h1>
		<Button href="/invite">
			<UserPlus />
			Add to Discord</Button
		>
	</section>
</div>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		.hero-header {
			gap: 10px;

			.buttons {
				display: flex;
				gap: 10px;
			}
		}
		.header {
			font-size: 2rem;
			font-weight: bold;
			margin: 0.5rem 0;
		}
		.subheader {
			color: #a1a1a1;

			a {
				color: white;
				text-decoration: underline;
			}
		}
		.pink {
			color: var(--light);
		}
		.label {
			border-radius: 99rem;
			width: max-content;
			background: var(--light);
			color: var(--dark);
			font-size: 1rem;
			font-weight: bold;
			padding: 0.25rem 0.75rem;
			user-select: none;
		}

		.cta {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			text-align: center;
			gap: 30px;
			padding: 3rem 4rem;
			background: var(--darker);
		}

		section {
			display: flex;
			gap: 50px;
			justify-content: space-between;
			padding: 2rem 100px;
			align-items: center;
			width: 100%;

			&.align-left {
				text-align: end;
				.text {
					align-items: flex-end;
				}
			}
			&.align-right {
				flex-direction: row-reverse;
			}
			.text {
				max-width: 700px;
				display: flex;
				flex-direction: column;
			}
			.image {
				user-select: none;
				img {
					image-rendering: optimizeSpeed;
					width: 100%;
				}
			}
		}
	}

	@media (max-width: 1100px) {
		.content {
			gap: 30px;
			.header {
				font-size: 1.5rem;
			}
			section {
				padding: 1rem;
				gap: 10px;
				flex-direction: column !important;
				.image img {
					width: 100%;
					max-height: 150px;
				}
				.text {
					max-width: 100%;
					align-items: flex-start !important;
					text-align: left !important;
				}
			}
		}
		.hero-header {
			text-align: center !important;
			.header {
				font-size: 2.5rem;
			}
			.hero-background img {
				max-height: 400px !important;
			}
		}
	}
</style>
