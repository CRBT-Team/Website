<main>
	<header>
		<h1>CRBT Event</h1>
		<h2>Coming July 2nd, 2022.</h2>
	</header>
	<a href="https://discord.gg/yGZEPng7V5?event=930525819825176656" class="Button" role="button">
		Get notified on Discord
	</a>
	<div class="command">
		<p>Or with CRBT:</p>
		<code>/remind me when:2022-07-02T16:00:00Z subject:CRBT Event</code>
	</div>
</main>

<style lang="scss">
	main {
		display: flex;
		height: 100vh;
		width: 100%;
		flex-direction: column;
		text-align: center;
		justify-content: center;
		align-items: center;
	}

	.command {
		margin: 2rem 0;
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
