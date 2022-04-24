<script>
	import { UserPlus } from 'lucide-svelte';
	import '../../styles/homepage.scss';
	import Button from './Button.svelte';
	import Section from './Section.svelte';
</script>

<Section align="center" className="cta">
	<h1 class="header">
		Enhance your Discord experience and make your server engaging, <br /><span class="pink"
			>all for free, forever</span
		>.
	</h1>
	<Button href="/invite">
		<UserPlus />
		Add to Discord</Button
	>
</Section>
