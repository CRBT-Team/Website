<script>
	import DesktopNavBar from './(marketing)/NavBar/DesktopNavBar.svelte';
	import Footer from './Footer.svelte';
	import MobileNavBar from './(marketing)/NavBar/MobileNavBar.svelte';
	import '../styles/home.scss';
	import '../styles/theme.scss';
</script>

<DesktopNavBar />
<MobileNavBar />
<slot />

<Footer />
