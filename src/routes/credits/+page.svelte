<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import MetaTags from '$lib/components/MetaTags.svelte';
	import Section from '$lib/components/Section.svelte';
	import { trimURL } from '$lib/util/functions/trimURL';
	import { ExternalLink } from 'lucide-svelte';
	import { credits, CRBTTeam } from './_credits';
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
	<table class="list">
		{#each [...CRBTTeam, ...credits] as member}
			<tr class="item">
				<td class="profile">
					<!-- <img src={member.pfp ?? '/assets/default_pfp.svg'} alt={member.name} /> -->
					<h4>{member.name}</h4>
				</td>
				<td class="description">
					{@html member.roles?.replace('Supporter', '<a href="/donate">Supporter</a>') ?? ''}
				</td>
				<!-- <td class="linkbutton">
					{#if member.url}
						<Button inline href={member.url}><ExternalLink />{trimURL(member.url)}</Button>
					{/if}
				</td> -->
			</tr>
		{/each}
	</table>
</Section>

<style lang="scss">
	.list {
		max-width: max-content;
	}

	.item {
		background-color: var(--color-surface);
		color: var(--color-on-surface);
		border-radius: var(--border-radius-medium);
		display: flex;
		flex-wrap: wrap;
		margin-top: 10px;
		// flex-direction: column;
		align-items: center;
		text-align: left;
		padding: 0.7rem;

		.profile {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			gap: 1rem;
			// margin-right: auto;
			img {
				border-radius: 50%;
				height: 45px;
				width: 45px;
				object-fit: cover;
				image-rendering: optimizeSpeed;
			}
		}
	}

	@media (max-width: 768px) {
		.item {
			gap: 0.5rem;
		}
	}
</style>
