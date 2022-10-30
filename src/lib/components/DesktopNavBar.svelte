<script lang="ts">
	import Wordmark from '$lib/svg/wordmark.svelte';
	import type { APIUser } from 'discord-api-types/v10';
	import { onMount } from 'svelte';
	import Button from './Button.svelte';

	let solidNavBar = false;

	export let show: 'always' | 'onscroll' = 'always';
	export let user: APIUser | null;

	const solidify = () => (solidNavBar = document.scrollingElement.scrollTop > 5);

	onMount(solidify);
</script>

<svelte:window on:scroll={solidify} />

<nav class="navbar-desktop" class:solid={solidNavBar} class:showonscroll={show === 'onscroll'}>
	<a href="/" class="side">
		<Wordmark />
	</a>

	<div class="items">
		<a href="/features" class="item">Features</a>
		<a href="/donate" class="item">Donate</a>
		<a href="/docs" class="item">Docs</a>
		<a href="/discord" class="item">Discord</a>
	</div>

	<div class="side">
		{#if user}
			<Button href="/dashboard">Dashboard</Button>
		{:else}
			<Button href="/login">Login</Button>
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
		// position: sticky;
		top: 0;
		left: 0;
		z-index: 1;

		&.showonscroll {
			opacity: 0;
			position: fixed;

			> * {
				transition: transform 0.2s ease;
				transform: translateY(50px);
			}
		}

		&:not(.showonscroll) {
			position: sticky;
		}

		background-color: rgb(0 0 0 / 0);
		transition: background 0.2s, opacity 0.2s;

		.items {
			display: flex;
			height: 100%;
			gap: 10px;
		}

		.item {
			display: flex;
			height: 100%;
			align-items: center;

			padding: 15px;
			border-radius: var(--border-radius-medium);

			&:hover {
				background-color: var(--color-surface-variant);
				color: var(--color-on-surface-variant);
			}
		}

		.side {
			padding: 0px;
			width: 100px;
			display: flex;
			align-items: flex-end;
		}

		&.solid {
			background-color: var(--color-surface);

			&.showonscroll {
				transition: opacity 0.2s;
				opacity: 1;

				> * {
					transition: transform 0.2s ease 0.1s;
					transform: translateY(0);
				}
			}
		}
	}
</style>
