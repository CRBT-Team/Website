<script lang="ts">
	import { page } from '$app/stores';
	import DesktopNavBar from './DesktopNavBar.svelte';
	import Footer from './Footer.svelte';

	// export let data: PageServerData;

	console.log($page.url);
</script>

<!-- show={$page.url.pathname === '/' ? 'onscroll' : 'always'} -->
<DesktopNavBar
	user={// data?.user
	// {
	// 	username: 'Clembs',
	// 	id: '123',
	// 	avatar: '',
	// 	discriminator: '1234'
	// }
	null}
/>
<main>
	<slot />
</main>

<Footer />
