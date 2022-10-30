<script lang="ts">
	import '../styles/theme.scss';
	import DesktopNavBar from '$lib/components/DesktopNavBar.svelte';
	import type { PageServerData } from './$types';
	import { page } from '$app/stores';

	export let data: PageServerData;

	console.log($page.url);
</script>

<DesktopNavBar
	show={$page.url.pathname === '/' ? 'onscroll' : 'always'}
	user={// data?.user
	{
		username: 'Clembs',
		id: '123',
		avatar: '',
		discriminator: '1234'
	}}
/>
<main>
	<slot />
</main>
<!-- <Footer /> -->
