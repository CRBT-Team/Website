<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ fetch }) => {
		const post = await (await fetch(`/policy.md`)).text();
		return {
			props: {
				post
			}
		};
	};
</script>

<script lang="ts">
	import MetaTags from '$lib/components/MetaTags.svelte';

	export let post;
	import { marked } from 'marked';
	import '../../styles/markdown.scss';
</script>

<MetaTags title="Privacy Policy" description="Read about our usage of data collection on CRBT." />

<main>
	{@html marked(post)}
</main>
