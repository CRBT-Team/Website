<script lang="ts">
	import { ArrowLeft } from 'lucide-svelte';

	export let href = '/';
</script>

<div class="back-btn">
	<a {href}>
		<ArrowLeft />
	</a>
</div>

<style lang="scss">
	.back-btn {
		padding: 1.5rem 1rem;
		margin-bottom: 3.8rem;
	}
</style>
