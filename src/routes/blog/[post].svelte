<!-- <script context="module" lang="ts">
	export const prerender = false;

	export const load: Load = async ({ params }) => {
		const post = await getPost(params.post);
		console.log(post.data);

		if (post !== null) {
			return {
				props: {
					post: post.code,
					metadata: post.data.fm
				}
			};
		}
	};
</script> -->
<script lang="ts">
	// import { getPost } from '$lib/blog';
	// import type { Load } from '@sveltejs/kit';
	import MetaTags from '$lib/components/MetaTags.svelte';
	import BlogHeader from '$lib/components/BlogHeader.svelte';
	// import '../../styles/markdown.scss';

	export let metadata: any;
	export let post: string;
</script>

<MetaTags title={metadata.title} description={metadata.description} />

<BlogHeader {metadata} />

<section itemprop="articleBody">
	{@html post}
	<!-- {@html replace(marked(post), ({ emoji, key }) => {
      return `<img class="emoji" src="https://clembs.xyz/emojis/${key}.png" alt="${emoji}">`;
    })} -->
</section>
