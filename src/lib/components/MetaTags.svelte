<script lang="ts">
	import { page } from '$app/stores';

	export let title: string = undefined;
	export let description: string = undefined;

	let tags = {
		site_name: 'CRBT',
		title: title ? `CRBT - ${title}` : 'CRBT - The Discord companion made for you.',
		description,
		baseUrl: 'https://crbt.ga',
		image: '/assets/logos/crbt.png',
		color: '#F17188'
	};
</script>

<svelte:head>
	<title>{tags.title}</title>
	<meta name="author" content={tags.site_name} />
	<meta name="title" content={tags.title} />
	{#if description} <meta name="description" content={tags.description} /> {/if}
	<meta name="distribution" content="web" />
	<meta name="copyright" content="&copy;2019-{new Date().getFullYear()} Clembs" />
	<meta name="theme-color" content={tags.color} />
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
	<meta property="og:image" content={tags.image} />
	<!-- Twitter -->
	<meta name="twitter:card" content="summary_small_image" />
	<meta name="twitter:site" content={tags.site_name} />
	<meta name="twitter:title" content={tags.title} />
	{#if description}<meta name="twitter:description" content={tags.description} /> {/if}
	<meta name="twitter:image" content={tags.image} />
	<!-- Icons -->
	<meta name="image" content={tags.image} />
	<link rel="icon" type="image/png" href={tags.image} />
	<link rel="apple-touch-icon" href={tags.image} />
</svelte:head>
