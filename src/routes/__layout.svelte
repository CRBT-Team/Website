<script lang="ts">
	import '../styles/global.scss';
	import Footer from '$lib/components/Footer.svelte';
	import NavBar from '$lib/components/NavBar.svelte';
</script>

<NavBar />
<slot />
<Footer />
