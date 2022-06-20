<script lang="ts">
	import CRBTIcon from '../svg/crbt.svelte';
	import {
		Menu,
		BookOpen,
		MessageSquare,
		Github,
		Award,
		UserPlus,
		ExternalLink,
		Eye,
		Heart
	} from 'lucide-svelte';

	const pages = (
		[
			[Heart, 'Donate', '/donate'],
			[BookOpen, 'Changelog', '/changelog'],
			[UserPlus, 'Invite CRBT', '/invite'],
			[MessageSquare, 'Join the Community', '/discord'],
			[Award, 'Credits', '/credits'],
			[Github, 'GitHub', '/github'],
			[Eye, 'Privacy Policy', '/policy'],
			[ExternalLink, 'Vote on Top.gg', '/vote'],
			[ExternalLink, 'View on Discord Bots', '/discordbots']
		] as [any, string, string][]
	).map(([icon, name, url]) => ({
		icon,
		name,
		url
	}));

	import { onMount } from 'svelte';
	let hideNavbar = false;
	let solid = false;
	let previousScroll = 0;
	let query;
	let showingMenu: 'none' | 'menu' | 'search' = 'none';
	$: searchResults = !query
		? pages
		: pages.filter(({ icon, name, url }) => name.toLowerCase().includes(query.toLowerCase()));

	onMount(() => {
		solid = document.scrollingElement.scrollTop > 5;
	});
</script>

<svelte:window
	on:scroll={() => {
		if (showingMenu !== 'none') return;
		solid = document.scrollingElement.scrollTop > 5;
		hideNavbar = window.scrollY > previousScroll;
		previousScroll = window.scrollY;
	}}
/>
{#if showingMenu !== 'none'}
	<div class="bg" on:click={() => (showingMenu = 'none')} />
{/if}

<nav class="mobile" class:hide={hideNavbar}>
	<a on:click={() => (showingMenu = 'none')} class="item" href="/">
		<CRBTIcon />
	</a>
	<div
		class="item"
		on:click={() => {
			showingMenu = showingMenu === 'menu' ? 'none' : 'menu';
		}}
	>
		<Menu />
	</div>
</nav>
<nav class="desktop" class:hide={hideNavbar} class:solid>
	<a href="/" class="item">
		<CRBTIcon />
	</a>
	<div class="list">
		<a href="/donate" class="item donate"> ❤️ Donate </a>
		<a href="/changelog" class="item"> Changelog </a>
		<a href="/invite" class="item"> Invite </a>
		<a href="/discord" class="item"> Discord </a>
	</div>
</nav>
<div class="navbar-sliding-menu" class:show={showingMenu === 'menu' && !hideNavbar}>
	<h2>More</h2>
	<div class="search">
		<input bind:value={query} role="search" type="text" placeholder="Search" />

		{#each searchResults as cool}
			<a class="item" href={cool.url}>
				<svelte:component this={cool.icon} />
				{cool.name}
			</a>
		{/each}
	</div>
</div>

<style lang="scss">
	a {
		text-decoration: none;
	}
	.bg {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: #000;
		z-index: 5;
		opacity: 0.6;
		transition: opacity 0.3s ease;
	}

	.mobile {
		display: none;
	}

	.desktop {
		display: flex;
		width: 100%;
		padding: 0 1.5rem;
		justify-content: space-between;
		position: sticky;
		align-items: center;
		top: 0;
		z-index: 100;
		transition: cubic-bezier(1, 0, 0, 1) 0.3s;

		&.hide {
			transform: translateY(-100%);
			transition: cubic-bezier(1, 0, 0, 1) 0.3s;
		}

		&.solid {
			background-color: var(--darker);
			box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
		}

		.list {
			display: flex;
			align-items: center;
			height: 100%;
		}
		.item {
			cursor: pointer;
			display: flex;
			align-items: center;
			padding: 1rem 1.5rem;
			font-size: 1.25em;
			user-select: none;
			transition: background-color cubic-bezier(0.4, 0, 0.2, 1) 0.3s;
			border-radius: 3rem;
			&:hover {
				color: var(--light);
				fill: var(--light);

				transition: background-color cubic-bezier(0.4, 0, 0.2, 1) 0.3s;
				background-color: rgba(255, 255, 255, 0.1);
			}
			&:active {
				opacity: 0.65;
			}

			&.donate {
				color: var(--light);

				&:hover {
					background-color: var(--light);
					color: var(--dark);
				}
			}
		}
	}

	@media (max-width: 800px) {
		.desktop {
			display: none;
		}

		.mobile {
			&.hide {
				transform: translateY(100%);
				box-shadow: none;
			}
			background: var(--darker);
			justify-content: space-evenly;
			display: flex;
			position: fixed;
			bottom: 0;
			width: 100%;
			user-select: none;
			cursor: pointer;
			z-index: 9;
			transition: cubic-bezier(1, 0, 0, 1) 0.3s;
			-webkit-tap-highlight-color: transparent;
			box-shadow: 0px 0px 20px 20px rgba(0, 0, 0, 0.3);
			.item {
				display: flex;
				align-items: center;
				justify-content: center;
				height: 3.5rem;
				width: 100%;
				padding: 0.8rem;
				width: 100%;
				color: white;
				fill: white;
				transition: cubic-bezier(0.5, 0, 0.5, 1) 0.2s;

				:global(svg) {
					height: 100%;
					width: auto;
				}

				&:hover {
					transform: scale(1.1);
					transition: cubic-bezier(0.5, 0, 0.5, 1) 0.2s;
				}
				&:active {
					transform: scale(0.8);
					transition: cubic-bezier(0.5, 0, 0.5, 1) 0.2s;
				}
			}
		}
	}

	.navbar-sliding-menu {
		position: fixed;
		bottom: 0;
		width: 100%;
		background: var(--darker);
		display: flex;
		flex-direction: column;
		// align-items: center;
		z-index: 8;
		transition: ease 0.3s;
		transform: translateY(100%);
		max-height: 350px;
		overflow-y: scroll;
		padding: 1rem;

		&::-webkit-scrollbar {
			width: 0;
		}

		.item {
			display: flex;
			align-items: center;
			padding: 1rem 0;
			gap: 1rem;
			// justify-content: center;
			height: 3.5rem;
			width: 100%;
			user-select: none;
			color: white;
			fill: white;
		}

		&.show {
			transform: translateY(-55px);
			transition: ease 0.3s;
		}

		input[type='text'] {
			appearance: none;
			width: 100%;
			background: var(--bg);
			height: 2.5rem;
			border: none;
			border-radius: 99rem;
			padding: 0 1rem;
			color: white;
			font-size: 1.2rem;
			outline: none;
			transition: ease 0.3s;
			&:focus {
				color: white;
			}
		}
	}
</style>
