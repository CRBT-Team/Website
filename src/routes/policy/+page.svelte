<script>
	import MetaTags from '$lib/components/MetaTags.svelte';
</script>

<MetaTags title="Privacy Policy" description="Read about our usage of data collection on CRBT." />

<article>
	<h1>CRBT - Privacy Policy</h1>
	<h5>Last update: July 14th, 2022</h5>
	<p>
		When you make use of the CRBT service, by adding it to a server, removing it from a server or by
		using it as a Discord user, you automatically apply to this privacy policy.
	</p>
	<h2>Your privacy controls</h2>
	<p>
		You can safely opt out of any future data collection on CRBT by using the <code>/privacy</code> command,
		and toggling “Telemetry” off on CRBT’s message.
	</p>
	<h2>How your data is used</h2>
	<p>
		The CRBT team does <strong>not</strong> give, share or sell your data to anyone. Your user &amp;
		server data is only accessible by me, the creator and main developer of CRBT, Clembs.
	</p>
	<p>
		This data is used to understand how is CRBT used so I can improve on its fluency and its ease of
		use. I also use this data in order to understand what commands are more used than others in
		order to prioritize the development of them.
	</p>
	<p>
		Errors thrown by the CRBT bot are also logged in order to help me fix them. These will always
		throw a message to the user, noted as an “Unknown error message”.
	</p>
	<p>I will also use the user ID to track potential abusers and breach-exploiters.</p>
	<h2>What data is logged</h2>
	<h3>When using a command (through any kind of Application Command):</h3>
	<ul>
		<li>The full command name with its options</li>
		<li>Your public Discord user ID</li>
		<li>Whether the command was used in a server or through DMs</li>
	</ul>
	<h3>When inviting or removing CRBT from a server:</h3>
	<ul>
		<li>The server’s name</li>
		<li>The server’s ID</li>
	</ul>
	<h3>When an unknown error occurs:</h3>
	<ul>
		<li>
			The <a
				href="https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object"
				rel="nofollow">interaction object</a
			>
		</li>
	</ul>
	<h2>Where this data is logged</h2>
	<p>
		Logged command &amp; server data is sent in a private Discord channel only accessible by me,
		Clembs, and CRBT itself.
	</p>
	<h2>Additional information</h2>
	<p>
		Although third-party services like <a href="https://heroku.com/" rel="nofollow">Heroku</a> and
		<a href="https://supabase.com" rel="nofollow">Supabase</a> are used by us to operate with CRBT, no
		Discord user data is stored on them.
	</p>
</article>
