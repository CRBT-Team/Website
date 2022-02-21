<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ params, fetch }) => {
		const post = await fetch(`/markdown/blog/${params.post}.md`);
		if (post.status === 200) {
			const text = await post.text();
			const meta = Object.fromEntries(
				text
					.split('---')[1]
					.split('\r\n')
					.slice(1, 4)
					.map((line) => [line.split(':')[0].trim(), line.split(':')[1].trim()])
			);
			console.log(meta);
			return {
				props: {
					post: text.split('---')[2],
					meta: {
						title: meta.title,
						description: meta.description,
						date: dayjs(meta.date)
					}
				}
			};
		}
	};
</script>

<script lang="ts">
	export let meta: {
		title: string;
		description: string;
		date: Dayjs;
	};
	export let post: string;
	import MetaTags from '$lib/components/MetaTags.svelte';
	import { marked } from 'marked';
	// import { replace } from 'node-emoji';
	import '../../styles/markdown.scss';
	import dayjs, { Dayjs } from 'dayjs';
</script>

<MetaTags title={meta.title} description={meta.description} />

<main>
	<article itemscope itemtype="http://schema.org/Article">
		<header>
			<h1 itemprop="name">CRBT {meta.title}</h1>
			<p>
				Published on <time datetime={meta.date.toISOString()}
					>{meta.date.format('MMMM D, YYYY')}</time
				>
			</p>
		</header>
		<section itemprop="articleBody">
			{@html marked(post)}
			<!-- {@html replace(marked(post), ({ emoji, key }) => {
				return `<img class="emoji" src="https://clembs.xyz/emojis/${key}.png" alt="${emoji}">`;
			})} -->
		</section>
	</article>
</main>
