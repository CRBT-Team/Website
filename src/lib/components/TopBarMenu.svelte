<script lang="ts">
	import { onMount } from 'svelte';
	import Back from './Back.svelte';

	export let showBackBtn = false;
	export let btnHref = '';
	export let text: string;
	let solid = false;
	let scrollPercentage: number;

	function solidify() {
		const perc = Math.round(document.scrollingElement.scrollTop / 1.5) / 100;
		scrollPercentage = perc > 1 ? 1 : perc;
		solid = document.scrollingElement.scrollTop > 60;
	}

	onMount(solidify);
</script>

<svelte:window on:scroll={solidify} />

<div class="topbar-header">
	<div class="topbar" class:solid style="--scroll:{solid ? scrollPercentage : 0}">
		{#if showBackBtn}
			<Back href={btnHref} />
		{/if}
		<div class="topbar-header">{text}</div>
	</div>

	<h1 class="top-header-text" style="--scroll:{scrollPercentage}">
		<slot />
	</h1>
</div>

<!-- </div> -->
<style lang="scss">
	.topbar {
		position: fixed;
		opacity: var(--scroll);
		top: 0;
		left: 0;
		width: 100%;
		background-color: var(--color-background);
		transition: background-color 0.2s, opacity 0.2s;
		display: flex;
		align-items: center;
		.topbar-header {
			padding: 2rem 0;
		}
		margin-bottom: 3.8rem;
		font-size: 1.6rem;

		&.solid {
			color: var(--color-on-surface);
			background-color: var(--color-surface);

			.topbar-header {
				transition: transform 0.2s ease;
			}
		}
	}

	.top-header-text {
		font-size: 3rem;
		font-weight: 400;
		margin-bottom: 1rem;
		margin-top: 8rem;
		opacity: calc(1 - var(--scroll));
	}

	@media (min-width: 800px) {
		.topbar {
			display: none;
		}

		.top-header-text {
			margin-top: 2rem;
			opacity: 1;
		}
	}
</style>
