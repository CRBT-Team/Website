<script lang="ts">
	import MetaTags from '$lib/components/MetaTags.svelte';
	import Button from '$lib/components/Button.svelte';
	import { Home } from 'lucide-svelte';
	import Section from '$lib/components/Section.svelte';
	import { page } from '$app/stores';
</script>

<Section align="center">
	<div>
		{#if $page.status === 404}
			<MetaTags title="Not found" />

			<h1>Page not found</h1>
			<p>We're sorry, but the page you were looking for does not exist.</p>
			<p>
				<Button inline href="/"><Home slot="icon" /> Go home</Button>
			</p>
		{:else}
			<MetaTags title="Error" />

			<h1>{$page.status}</h1>

			<h2>
				<pre>{$page.error.message}</pre>
			</h2>
			<pre>{String($page.error)}</pre>
		{/if}
	</div>
</Section>
