<script context="module" lang="ts">
	import type { ErrorLoad } from '@sveltejs/kit';

	export const load: ErrorLoad = ({ status, error }) => {
		return {
			props: {
				status,
				...error
			}
		};
	};
</script>

<script lang="ts">
	import MetaTags from '$lib/components/MetaTags.svelte';
	import Button from '$lib/components/Button.svelte';
	import { Home } from 'lucide-svelte';
	import Section from '$lib/components/Section.svelte';

	export let status: number;
	export let name: string;
	export let message: string;
	export let stack: string;
</script>

<Section align="center">
	<div>
		{#if status === 404}
			<MetaTags title="Not found" />

			<h1>Page not found</h1>
			<p>We're sorry, but the page you were looking for does not exist.</p>
			<p>
				<Button href="/"><Home /> Go home</Button>
			</p>
		{:else}
			<MetaTags title="Error" />

			<h1>{status}</h1>

			<h2>
				<pre>{message}</pre>
			</h2>
			<pre>{stack}</pre>
		{/if}
	</div>
</Section>
