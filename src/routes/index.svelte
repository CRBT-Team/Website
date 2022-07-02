<script>
	import {
		UserPlus,
		ChevronDown,
		CheckSquare,
		Languages,
		Coins,
		Hand,
		List,
		LayoutList,
		Gift
	} from 'lucide-svelte';
	import Button from '$lib/components/Button.svelte';
	import '../styles/homepage.scss';
	import MetaTags from '$lib/components/MetaTags.svelte';
	import Cta from '$lib/components/CTA.svelte';
	import Section from '$lib/components/Section.svelte';
</script>

<MetaTags
	description="CRBT is a Discord bot that helps you get things done quickly through user-friendly and customizable commands."
/>

<div role="main" class="content">
	<Section align="right" className="hero-header">
		<div class="hero-background image">
			<img src="/assets/hero-image.png" draggable="false" alt="CRBT ultra cool" />
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
	</Section>
	<div id="features" />
	<!-- <Section align="left">
		<div class="image">
			<img src="/assets/tada_deluxe.svg" alt="A party popper" />
		</div>
		<div class="text">
			<h1 class="header">Create giveaways with ease!</h1>
		</div>
	</Section> -->
	<Section align="left">
		<div class="image">
			<img
				loading="lazy"
				src="/assets/role-pickers.svg"
				alt="CRBT showing slash command autocomplete options"
			/>
		</div>
		<div class="text">
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
	</Section>
	<Section align="right">
		<div class="image">
			<img src="/assets/localization.svg" alt="CRBT showing slash command autocomplete options" />
		</div>
		<div class="text">
			<h1 class="header">Speaks <span class="pink">your language</span>.</h1>
			<p class="subheader">
				Partial support for localization within commands in American and British English, Spanish,
				French, German, Russian, Vietnamese and Romanian is also available. All of which is possible
				thanks to our <a href="/credits">collaborators</a>.
			</p>
		</div>
	</Section>
	<Section align="left">
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
	</Section>

	<Section align="center">
		<h1 class="header">Features everything you'd expect, <span class="pink">and more</span>!</h1>

		<div class="features">
			<div class="feature">
				<div class="top">
					<div class="icon">
						<Hand />
					</div>
					<div class="label">NEW</div>
				</div>
				<h3>Welcome & farewell messages</h3>
				<p class="subheader">
					Welcome your members to your server with a custom message, and set up custom scripts to
					give roles and coins using our custom-built <a href="/script">CRBTscript</a> language.
				</p>
			</div>
			<div class="feature">
				<div class="top">
					<div class="icon">
						<Gift />
					</div>
					<div class="label">NEW</div>
				</div>
				<h3>Giveaways</h3>
				<p class="subheader">
					Create giveaways with custom rules and cool prizes to give for your members to
					participate.
				</p>
			</div>
			<div class="feature">
				<div class="top">
					<div class="icon">
						<LayoutList />
					</div>
				</div>
				<h3>Role Pickers</h3>
				<p class="subheader">Create intuitive self-role selector menus for your members.</p>
			</div>
			<div class="feature">
				<div class="top">
					<div class="icon">
						<CheckSquare />
					</div>
				</div>
				<h3>Polls</h3>
				<p class="subheader">Create polls for your members to vote on specific subjects.</p>
			</div>
			<div class="feature">
				<div class="top">
					<div class="icon">
						<Languages />
					</div>
				</div>
				<h3>Localization</h3>
				<p class="subheader">
					CRBT is partially localized in English, French, German, Spanish, Portuguese, Russian,
					Vietnamese, Romanian... and more soon thanks for the fan translations!
				</p>
			</div>
			<div class="feature">
				<div class="top">
					<div class="icon">
						<List />
					</div>
					<div class="label">JULY</div>
				</div>
				<h3>Logging</h3>
				<p class="subheader">
					Choose a channel to send logs of your server's deleted & edited messages, member
					joins/leaves and moderation actions.
				</p>
			</div>
			<div class="feature">
				<div class="top">
					<div class="icon">
						<Coins />
					</div>
					<div class="label">JULY</div>
				</div>
				<h3>Customizable economy</h3>
				<p class="subheader">
					Create your very own economy system in your servers, from the currency to the income, down
					to the items!
				</p>
			</div>
		</div>
	</Section>
	<Cta />
</div>

<style lang="scss">
</style>
