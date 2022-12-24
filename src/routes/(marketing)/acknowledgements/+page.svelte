<script lang="ts">
	export const prerender = true;

	import Button from '$lib/components/Button.svelte';
	import MetaTags from '$lib/components/MetaTags.svelte';
	import TopBarMenu from '$lib/components/TopBarMenu.svelte';
	import { Heart } from 'lucide-svelte';
	import PersonCredit from './PersonCredit.svelte';
	import { CRBTTeam, supporters, localization, specialThanks } from './_credits';
</script>

<MetaTags title="Acknowledgements" description="The people who shaped CRBT" />

<main>
	<div class="header">
		<TopBarMenu showBackBtn text="Acknowledgements">
			The people who <span class="emphasis-primary">shaped CRBT</span>.
		</TopBarMenu>
		CRBT surely would not have been this great if it wasn't for the incredible help and support of these
		people, and for the existence of these tools.
	</div>
	<section>
		<h2>The CRBT Team</h2>
		<p>The main developers and founders of CRBT.</p>
		<div class="list">
			{#each CRBTTeam as person}
				<PersonCredit {person} />
			{/each}
		</div>
	</section>
	<section>
		<h2>Supporters</h2>
		<p>
			People who have donated to Clembs in the past, or who are actively still supporting the
			project!
		</p>
		<div class="list">
			{#each supporters as person}
				<PersonCredit minimal {person} />
			{/each}
			<Button style="secondary" href="/donate">
				<Heart slot="icon" />
				Donate
			</Button>
		</div>
	</section>

	<section>
		<h2>Localization team</h2>
		<p>People that actively help us to bring CRBT into many languages and cultures. ありがとう!</p>
		<div class="list">
			{#each localization as person}
				<PersonCredit minimal {person} />
			{/each}
		</div>
	</section>

	<section>
		<h2>Special thanks</h2>
		<p>
			People that were involved a lot in the project or helped with miscellaneous things like art.
		</p>
		<div class="list">
			{#each Object.entries(specialThanks).map(([name, url]) => ({ name, url })) as person}
				<PersonCredit minimal {person} />
			{/each}
		</div>
	</section>
</main>

<style lang="scss">
	.header {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		margin: 0 auto;
	}

	section {
		margin: 3rem 0;
	}

	.list {
		display: grid;
		width: 100%;
		height: 100%;
		gap: 1rem;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
	}
</style>
