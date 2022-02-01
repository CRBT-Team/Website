<script>
	import MetaTags from '$lib/components/MetaTags.svelte';
</script>

<MetaTags
	description="CRBT is a Discord bot that helps you get things done quickly through user-friendly and customizable commands."
/>

<main>
	<header class="header">
		<div class="banner" />
		<div class="headerContent">
			<h1>
				<span>The Discord companion</span>
				<span>made for you.</span>
			</h1>
			<p class="subtext">
				Quit the hassle and ditch all of your different bots. <br />
				CRBT is easy, powerful and efficient.
			</p>

			<a href="/invite" class="Button">Add to Discord</a>

			<p class="subtext" style="font-size: smaller;">
				Note: CRBT is going through a big rewrite for the moment<br /> and some of its features may
				be limited.
				<a href="/blog/v11-beta-changelog" style="text-decoration: underline;">Learn more</a>
			</p>
		</div>
	</header>
	<!-- 
	<div class="noiselayer">
		<h2 class="why">Why CRBT?</h2>
	</div> -->

	<section class="section1">
		<div class="text">
			<h2>Now using Slash commands!</h2>
			<p>
				We've spent a lot of time carefully designing the new version of CRBT around the new Discord
				API. Slash commands means you get a nice overview of all the commands, and autocomplete to
				help you find the right options. Just type / and click CRBT to get started!
			</p>
		</div>
		<div class="img">
			<img src="https://cdn.clembs.xyz/Tu4vEe0.png" alt="/user pfp with options" />
		</div>
	</section>

	<section class="section2">
		<div class="text">
			<h2>Get any kind of info, FAST</h2>
			<p>
				CRBT was designed around speed, simplicity and ease of use. We've made it easy to get any
				kind of info you need, from a simple translation using <code>/translate</code> to a whole
				sheet of info about the server of your choice with <code>/server info</code>`. You can even
				enlarge an emoji using
				<code>/emoji info</code> or start a Watch Together party with the <code>/activity</code> command!
			</p>
		</div>

		<div class="img">
			<img src="https://cdn.clembs.xyz/NoXYHmk.png" alt="/define word:useful" />
		</div>
	</section>

	<section class="section1">
		<div class="text">
			<h2>Looks great, and behaves how you'd like</h2>
			<p>
				CRBT was made to look just right with its gorgeous UI and its customization options so you
				can tune it to look, feel, and behave however you'd like!
			</p>
		</div>
	</section>
</main>

<style lang="scss">
	main {
		min-width: 100%;
		padding: 0;
		margin: 0;
		line-height: initial;
		display: flex;
		flex-direction: column;
		align-items: center;
		h1 {
			font-size: 2.5em;
		}
	}

	@media (max-width: 1080px) {
		main h1 span {
			display: block;
		}
	}

	@media (max-width: 450px) {
		main h1 {
			font-size: 8.8vw;
		}
	}
	@media (max-width: 640px) {
		.header p {
			font-size: 3.8vw !important;
		}
	}

	// Header
	.header {
		color: black;
		background: linear-gradient(180deg, #649dff 0%, #3781ff 100%);
		width: 100%;
		flex: 0 0 600px;
		text-align: center;
		position: relative;

		padding-top: 114px;
		margin-top: -114px;

		@media (max-width: 1300px) {
			flex: 0 0 800px;
		}
		@media (max-width: 1080px) {
			flex: 0 0 850px;
		}

		p {
			font-size: 1.25em;
		}

		.subtext {
			margin-left: 2rem;
			margin-right: 2rem;
		}

		.banner {
			position: absolute;
			left: 50%;
			bottom: 0px;
			transform: translateX(-50%);
			z-index: 0;
			pointer-events: none;
			width: 100%;
			max-width: 4439px;
			height: 830px;
			background-image: url(/assets/home-banner-desktop.svg);
			background-size: cover;
			background-position-x: 43%;
			margin: auto;

			@media (max-width: 2000px) {
				background-position-x: 45%;
			}
			@media (max-width: 1300px) {
				height: 900px;
				background-position-x: 35%;
			}
			@media (max-width: 1080px) {
				height: 850px;
				background-position-x: 30%;
			}
			@media (max-width: 650px) {
				height: 750px;
				background-position-x: 30%;
			}
		}

		.headerContent {
			position: relative;
			z-index: 10;
		}
	}

	// h2.why {
	// 	font-size: 2rem;
	// 	width: 100%;
	// 	text-align: center;
	// }

	// .noiselayer {
	// 	background-image: url(/noise-layer.webp);
	// 	width: 100%;
	// 	display: flex;
	// }

	// Section 1
	.section1,
	.section2 {
		width: 100%;
		padding: 2em 2em;
		gap: 2rem;
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		background-image: url(/noise-layer.webp);

		@media (max-width: 850px) {
			gap: initial;
			flex-direction: column-reverse;
			padding: 2rem 3rem;
			.text {
				flex-wrap: wrap;
				width: 100%;
			}
		}

		.text {
			max-width: 30rem;
		}

		h2 {
			font-weight: 700;
		}

		.img {
			display: flex;
			justify-content: center;

			& > * {
				width: 23rem;
				border-radius: 1rem;
				@media (max-width: 850px) {
					width: 80vw;
					align-self: center;
				}
			}
		}
	}

	.section1 {
		background-color: #4a0920;
	}
	.section2 {
		background-color: #f27187;
		color: #4a0920;
		flex-direction: row-reverse;
		@media (max-width: 850px) {
			flex-direction: column-reverse;
			.text {
				text-align: left !important;
			}
		}

		.text {
			text-align: right;
		}
	}

	.Button {
		display: inline-block;
		margin-top: 0.3rem;
		color: #4a0920;
		background-color: white;

		border-radius: 1rem;
		font-size: 1.5rem;
		padding: 0.3rem 1.2rem;

		transition: background-color 200ms;
		transition: color 200ms;

		&:hover {
			background: #f17086;
			color: white;
			box-shadow: rgba(0, 0, 0, 35%) 0px 3px 14px 0px;
		}
		&:active {
			background: #ffb9d1;
			color: #4a0920;
			// transition: opacity 50ms;
		}
	}
</style>
