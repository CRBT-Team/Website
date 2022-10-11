<script lang="ts">
	import '../styles/theme.scss';
	import DesktopNavBar from '$lib/components/DesktopNavBar.svelte';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<DesktopNavBar user={data?.user} />
<main>
	<slot />
</main>
<!-- <Footer /> -->
