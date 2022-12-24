<script lang="ts">
	import { page } from '$app/stores';

	export let title: string = undefined;
	export let description: string = undefined;
	export let image: string = '/banner.png';
	export let thumbnail: string = undefined;

	let tags = {
		site_name: 'CRBT',
		title: title ? `${title} - CRBT` : 'CRBT | The perfect just-about-anything Discord app.',
		description,
		baseUrl: $page.url.host,
		thumbnail: image ? undefined : thumbnail,
		image
	};
</script>

<svelte:head>
	<title>{tags.title}</title>
	<meta name="author" content={tags.site_name} />
	<meta name="title" content={tags.title} />
	{#if description} <meta name="description" content={tags.description} /> {/if}
	<meta name="copyright" content="&copy;{new Date().getFullYear()} CRBT" />
	<!-- Google index -->
	<meta name="”robots”" content="”follow,index”" />
	<meta name="”googlebot”" content="”follow,index”" />
	<link rel="canonical" href={tags.baseUrl} />
	<!-- OpenGraph -->
	<meta property="og:site_name" content={tags.site_name} />
	<meta property="og:title" content={tags.title} />
	{#if description} <meta property="og:description" content={tags.description} /> {/if}
	<meta property="og:url" content="{tags.baseUrl}{$page.url.pathname}" />
	<meta property="og:type" content="website" />
	<meta property="og:image" content={tags.image ?? tags.thumbnail} />
	<!-- Twitter -->
	<meta name="twitter:card" content={tags.image ? 'summary_large_image' : 'summary_small_image'} />
	<meta name="twitter:site" content={tags.site_name} />
	<meta name="twitter:title" content={tags.title} />
	{#if description} <meta name="twitter:description" content={tags.description} /> {/if}
	<meta name="twitter:image" content={tags.image ?? tags.thumbnail} />
	<!-- Icons -->
	<meta name="image" content={tags.image ?? tags.thumbnail} />
	<link rel="apple-touch-icon" href={tags.thumbnail} />
</svelte:head>
