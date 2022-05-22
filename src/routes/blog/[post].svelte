<script lang="ts">
	import MetaTags from '$lib/components/MetaTags.svelte';
	import BlogHeader from '$lib/components/BlogHeader.svelte';

	export let metadata: any;
	export let post: string;
</script>

<MetaTags {...metadata} />

<BlogHeader {metadata} />

<section itemprop="articleBody">
	{@html post}
</section>
