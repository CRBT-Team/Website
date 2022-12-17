<script lang="ts">
	import { page } from '$app/stores';
	import DesktopNavBar from './DesktopNavBar.svelte';
	import Footer from './Footer.svelte';
	import MobileNavBar from './MobileNavBar.svelte';
	// export let data: PageServerData;
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
<MobileNavBar />
<main>
	<slot />
</main>

<Footer />
