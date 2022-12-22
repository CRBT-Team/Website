<script lang="ts">
	import { page } from '$app/stores';
	import Modal from '$lib/components/Modal.svelte';
	import TextField from '$lib/components/TextField.svelte';
	import CRBT from '$lib/svg/crbt.svelte';
	import { Menu, Search } from 'lucide-svelte';
	import Links from '../WebsiteLink/Links.svelte';

	type Tab = 'home' | 'more';

	let selectedTab: Tab = 'home';
	let searchValue = '';
	let showSearchModal = false;

	page.subscribe(({ url: { pathname } }) => {
		if (pathname.endsWith('/')) selectTab('home');
		if (pathname.endsWith('more')) selectTab('more');
	});

	function selectTab(tab: Tab) {
		selectedTab = tab;
	}
</script>

{#if showSearchModal}
	<Modal title="Search" on:close={() => (showSearchModal = false)}>
		<div class="middle">
			<TextField on:input={(t) => (searchValue = t.detail)} type="text" />
		</div>
		<div class="bottom">
			<Links filter={(i) => i.label.toLowerCase().includes(searchValue?.toLowerCase())} />
		</div>
	</Modal>
{/if}

<nav class="navbar-mobile">
	<a
		href="/"
		class="item"
		class:selected={selectedTab === 'home'}
		on:click={() => selectTab('home')}
	>
		<div class="background" />
		<div class="icon">
			<CRBT />
		</div>
		Home
	</a>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div class="item" on:click={() => (showSearchModal = true)}>
		<div class="background" />
		<div class="icon">
			<Search />
		</div>
		Search
	</div>
	<a
		href="/more"
		class="item"
		class:selected={selectedTab === 'more'}
		on:click={() => selectTab('more')}
	>
		<div class="background" />
		<div class="icon">
			<Menu />
		</div>
		More
	</a>
</nav>

<style lang="scss">
	.navbar-mobile {
		display: flex;
		justify-content: space-around;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 9;
		width: 100%;
		background-color: var(--color-surface);
		padding: 10px;
		transition: transform 0.2s ease-in-out;

		.item {
			color: var(--color-on-surface);
			font-size: 1.2rem;
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 5px;
			cursor: pointer;

			.background {
				position: absolute;
				height: 34px;
				width: 20px;
				opacity: 0;
				transition: width 0.2s ease-out;
				background-color: var(--color-surface-variant);
				border-radius: 20px;
				z-index: -1;
			}

			.icon {
				padding: 5px 20px;
				display: flex;
				align-items: center;
			}

			&.selected {
				color: var(--color-on-background);
				font-weight: 600;

				.background {
					width: 64px;
					opacity: 1;
					transition: width 0s none;
				}

				:global(.icon svg) {
					stroke-width: 2;
				}
			}

			:global(.icon svg) {
				width: 24px;
				height: 24px;
			}
		}
	}

	@media (min-width: 800px) {
		.navbar-mobile {
			display: none;
		}
	}

	.middle {
		width: 100%;
		padding: 0px 20px;
	}

	.bottom {
		overflow-y: scroll;
		width: 100%;
	}
</style>
