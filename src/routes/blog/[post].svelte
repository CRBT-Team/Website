<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ params, fetch }) => {
		const post = await fetch(`/markdown/blog/${params.post}.md`);
		if (post.status === 200) {
			return {
				props: {
					post: await post.text()
				}
			};
		}
	};
</script>

<script lang="ts">
	export let post: string;
	import MetaTags from '$lib/components/MetaTags.svelte';
	//	import { removeMarkdown } from '$lib/util/functions/escapeMarkdown';
	import { marked } from 'marked';
	import '../../styles/markdown.scss';

	// console.log(
	// 	removeMarkdown(post.replace(post.split('\n')[0], ''))
	// 		.split(' ')
	// 		.slice(0, 20)
	// 		.join(' ')
	// 		.replace('\n', '')
	// 		.trim()
	// );
</script>

<MetaTags
	title={post
		.split('\n')[0]
		.replace(/# CRBT - |# /, '')
		.trim()}
/>

<main>
	{@html marked(post)}
</main>
