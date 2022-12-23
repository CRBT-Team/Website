<script lang="ts">
	import Avatar from '$lib/components/Avatar.svelte';
	import Card from '$lib/components/Card.svelte';
	import type { PersonCredit } from './_credits';

	export let person: PersonCredit;
	export let minimal = false;
</script>

<Card href={person.url}>
	<div class="item" class:minimal>
		{#if minimal}
			<Avatar size="2rem" alt={person.name} src={person.avatar ?? '/assets/avatars/default.svg'} />
			<p>{person.name}</p>
		{:else}
			<Avatar alt={person.name} src={person.avatar ?? '/assets/avatars/default.svg'} />
			<h2>{person.name}</h2>
			{#if person.roles}
				<div class="description">
					{@html person.roles}
				</div>
			{/if}
		{/if}
	</div>
</Card>

<style lang="scss">
	.item {
		color: var(--color-on-surface);
		border-radius: var(--border-radius-medium);
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: 0.8rem;

		h2 {
			margin: 0;
		}

		&.minimal {
			flex-direction: row;
			text-align: left;
		}
	}
</style>
