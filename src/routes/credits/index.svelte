<script lang="ts">
	import Button from '$lib/components/Button.svelte';

	import MetaTags from '$lib/components/MetaTags.svelte';
	import Section from '$lib/components/Section.svelte';
	import { trimURL } from '$lib/util/functions/trimURL';
	import { ExternalLink } from 'lucide-svelte';
	import { credits } from './_credits';
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
	<li class="list">
		{#each credits as person}
			<div class="item">
				<div class="profile">
					<img src={person.pfp ?? '/assets/default_pfp.svg'} alt={person.name} />
					<h3>{person.name}</h3>
				</div>
				<div class="description">
					<p>{@html person.roles?.replace('Supporter', '<a href="/donate">Supporter</a>') ?? ''}</p>
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
	</li>
</Section>

<style lang="scss">
	.list {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 20px;
		width: 100%;
		max-width: fit-content;
	}

	.item {
		background-color: var(--darker);
		border-radius: 2rem;
		display: flex;
		gap: 1.7rem;
		flex-wrap: wrap;
		// flex-direction: column;
		align-items: center;
		text-align: left;
		padding: 0.7rem;

		.profile {
			display: flex;
			align-items: center;
			gap: 1rem;
			min-width: 240px;
			max-width: 240px;
			// margin-right: auto;
			img {
				border-radius: 50%;
				height: 65px;
				width: 65px;
				object-fit: cover;
				image-rendering: optimizeSpeed;
			}
		}

		.description {
			margin-right: auto;
		}

		.linkbutton {
			margin-left: auto;
		}
	}

	@media (max-width: 768px) {
		.item {
			gap: 0.5rem;
		}
	}
</style>
