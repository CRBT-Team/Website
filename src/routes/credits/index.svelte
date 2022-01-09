<script lang="ts">
	import MetaTags from '$lib/components/MetaTags.svelte';
	import { credits, userData } from './_credits';
	const a = Object.entries(credits).map(([title, people]) => {
		return {
			title,
			people: people.map((person) => {
				return {
					username: person,
					pfp: userData[person].avatar ?? '/placeholder-image.png',
					url: userData[person].url
				};
			})
		};
	});
</script>

<MetaTags title="Credits" description="People who made CRBT what it is today." />

<main>
	<header>
		<h1>CRBT - Credits</h1>
		<p>CRBT probably wouldn't be where it is today without these people, so thanks!</p>
	</header>
	{#each a as credit}
		<h2>{credit.title}</h2>
		<div class="group">
			{#each credit.people as person}
				{#if person.url}
					<a href={person.url}>
						<div class="card">
							<img src={person.pfp} alt={person.username} />
							<span>{person.username}</span>
						</div>
					</a>
				{:else}
					<div class="card">
						<img src={person.pfp} alt={person.username} />
						<span>{person.username}</span>
					</div>
				{/if}
			{/each}
		</div>
	{/each}
</main>

<style lang="scss">
	main {
		header {
			margin-bottom: 3rem;
		}
	}

	.group {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(11rem, 1fr));
		grid-gap: 1.5rem;
	}

	.card {
		background-color: #330716;
		height: calc(50px + 2em);
		border-radius: 8px;
		display: block;
		display: flex;
		align-items: center;
		gap: 1em;
		padding: 1em;

		img {
			flex: 0 0 50px;
			border-radius: 50%;
			height: 50px;
		}

		&:hover {
			background-color: #2f0714;
		}
		&:active {
			background-color: #290711;
		}
	}
</style>
