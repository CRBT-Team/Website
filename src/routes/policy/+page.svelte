<script>
	import MetaTags from '$lib/components/MetaTags.svelte';
</script>

<MetaTags title="Privacy Policy" description="Read about our usage of data collection on CRBT." />

<article>
	<h1>CRBT - Privacy Policy</h1>
	<h5>Last update: November 28th, 2022</h5>
	<p>
		When you make use of the CRBT service (bot or web app), by adding it to or removing it from a
		server, or by using it as a Discord user, you automatically apply to this privacy policy.
	</p>
	<h2>How your data is used</h2>
	<p>
		You user and server data is only accessible to the creator of CRBT, Clembs, and is never
		<strong>not</strong> shared or sold to anyone else, even within the CRBT Team.
	</p>
	<p>
		Your data is used for analytical purposes: understand how it is used, what commands are used the
		most, what errors get brought up the most to fix them later.
	</p>

	<h3>Command data</h3>
	<p>
		Upon using any kind of command, some data is sent as a message to a private Discord channel
		(only accessible by the founder, Clembs, and CRBT itself). You can opt out of command telemetry
		by consulting the `/privacy` command and toggling the "Telemetry" setting off. Logged data
		includes:
	</p>
	<ul>
		<li>The command name without its options input</li>
		<li>Your public Discord user ID</li>
		<li>Whether the command was used in a server or through DMs</li>
	</ul>

	<h3>Server invite/removal data</h3>
	<p>CRBT logs some server data when a user invites or removes CRBT from it, including:</p>
	<ul>
		<li>The server’s name</li>
		<li>The server’s ID</li>
	</ul>

	<h3>Error data</h3>
	<p>
		User-facing error messages sent by CRBT are always logged in order to help us fix them. These
		are denoted with a red embed color and a X red icon, and will always be marked as so. Data sent
		includes the error name, what command it occured on, as well as the <a
			href="https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object"
			rel="nofollow">interaction object</a
		>. You currently can't opt out of this telemetry.
	</p>

	<h2>Additional information</h2>
	<p>
		Although third-party services like <a href="https://railway.app/" rel="nofollow">Railway</a> and
		<a href="https://supabase.com" rel="nofollow">Supabase</a> are used by us to operate with CRBT, no
		Discord user data is stored on them.
	</p>
</article>
