<script lang="ts">
	import Button from '$lib/components/Button.svelte';

	import MetaTags from '$lib/components/MetaTags.svelte';
	import Section from '$lib/components/Section.svelte';
	import { trimURL } from '$lib/util/functions/trimURL';
	import { ExternalLink } from 'lucide-svelte';
	import { credits, specialThanks } from './_credits';
</script>

<MetaTags title="Credits" description="People who made CRBT what it is today." />

<Section align="center">
	<h1 style="font-size:xx-large;">The people that <span class="pink">shaped CRBT</span>.</h1>
	<p>
		CRBT sure would not have been this great if it wasn't for the incredible help and support of
		these people.
	</p>
</Section>
<Section align="center" className="group">
	<div class="group">
		{#each credits as person}
			<div class="card">
				<div class="profile">
					<img src={person.pfp ?? '/assets/default_pfp.svg'} alt={person.name} />
					<h2>{person.name}</h2>
				</div>
				<div class="description">
					<p>{person.roles}</p>
				</div>
				<div class="linkbutton">
					{#if person.url}
						<Button href={person.url} style="secondary"
							><ExternalLink />{trimURL(person.url)}</Button
						>
					{/if}
				</div>
			</div>
		{/each}
	</div>
</Section>

<style lang="scss">
	.group {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		// grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 20px;
		grid-auto-rows: min-content;
		grid-template-rows: auto;
		width: 80%;
	}

	.card {
		background-color: var(--darker);
		border-radius: 2rem;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		text-align: left;
		padding: 1rem;

		.profile {
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 1rem;
		}

		.linkbutton {
			margin-top: auto;
		}

		img {
			border-radius: 50%;
			height: 50px;
		}
	}
</style>
