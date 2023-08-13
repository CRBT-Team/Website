<script>
	import DesktopNavBar from './NavBar/DesktopNavBar.svelte';
	import Footer from './Footer.svelte';
	import MobileNavBar from './NavBar/MobileNavBar.svelte';
	import '../styles/home.scss';
	import '../styles/theme.scss';
</script>

<DesktopNavBar />
<MobileNavBar />
<slot />

<Footer />
