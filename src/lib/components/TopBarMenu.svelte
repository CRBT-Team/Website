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

<!-- <div class="topbar-header"> -->
<div class="topbar" class:solid style="--scroll:{solid ? scrollPercentage : 0}">
	{#if showBackBtn}
		<Back href={btnHref} />
	{/if}
	<div class="topbar-header">{text}</div>
</div>

<h1 class="top-header-text" style="--scroll:{scrollPercentage}">{text}</h1>

<!-- </div> -->
<style lang="scss">
	// .topbar-header {
	.topbar {
		position: sticky;
		top: 0;
		left: 0;
		width: 100%;
		background-color: var(--color-background);
		transition: background-color 0.2s, opacity 0.2s;
		display: flex;
		align-items: center;
		overflow: hidden;
		margin-bottom: 3.8rem;

		.topbar-header {
			font-size: 1.6rem;
			opacity: var(--scroll);
		}

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
		padding: 20px;
		margin-bottom: 0.5rem;
		opacity: calc(1 - var(--scroll));
	}
	// }
</style>
