<script lang="ts">
	import Wordmark from '$lib/svg/wordmark.svelte';
	import type { APIUser } from 'discord-api-types/v10';
	import { onMount } from 'svelte';
	import Button from '$lib/components/Button.svelte';
	import Discord from '$lib/svg/brands/discord.svelte';

	let solidNavBar = false;

	// export let show: 'always' | 'onscroll' = 'always';
	export let user: APIUser | null;

	const solidify = () => (solidNavBar = document.scrollingElement.scrollTop > 5);

	onMount(solidify);
</script>

<svelte:window on:scroll={solidify} />

<nav class="navbar-desktop" class:solid={solidNavBar}>
	<a href="/" class="logo">
		<Wordmark />
	</a>

	<div class="items">
		<a href="/#features" class="item">Features</a>
		<a href="/donate" class="item">Donate</a>
		<a href="/docs" class="item">Docs</a>
	</div>

	<div class="button">
		{#if user}
			<Button href="/dashboard">Dashboard</Button>
		{:else}
			<Button href="/invite">
				<Discord slot="icon" />
				Add to Discord
			</Button>
		{/if}
	</div>
</nav>

<style lang="scss">
	.navbar-desktop {
		display: flex;
		overflow: hidden;
		justify-content: space-between;
		width: 100%;
		padding: 10px 20px;
		align-items: center;
		position: sticky;
		top: 0;
		left: 0;
		z-index: 1;

		background-color: rgb(0 0 0 / 0);
		transition: background-color 0.2s, opacity 0.2s, transform 0.2s ease-in-out;

		.items {
			display: flex;
			height: 100%;
			gap: 10px;
		}

		.item {
			display: flex;
			height: 100%;
			align-items: center;
			text-decoration: none;

			padding: 15px;
			border-radius: var(--border-radius-medium);

			&:hover {
				background-color: var(--color-surface-variant);
				color: var(--color-on-surface-variant);
			}
		}

		.logo {
			width: 200px;
			:global(svg) {
				width: 120px;
			}
		}

		.button {
			width: 200px;
			display: flex;
			align-items: flex-end;
		}

		&.solid {
			background-color: var(--color-surface);
		}
	}

	@media (max-width: 800px) {
		.navbar-desktop {
			display: none;
		}
	}
</style>
