<script lang="ts">
	import DesktopNavBar from './NavBar/DesktopNavBar.svelte';
	import Footer from './Footer.svelte';
	import MobileNavBar from './NavBar/MobileNavBar.svelte';
	// export let data: PageServerData;
	import '../../styles/home.scss';
</script>

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
<slot />

<Footer />
