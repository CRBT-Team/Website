<script lang="ts">
	import { page } from '$app/stores';
	import AddToDiscord from '$lib/components/AddToDiscord.svelte';
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
		console.log(page);
		if (pathname.endsWith('/')) selectTab('home');
		if (pathname.endsWith('more')) selectTab('more');
	});

	function selectTab(tab: Tab) {
		selectedTab = tab;
	}

	function toggleSearch() {
		if (showSearchModal) {
			document.body.classList.remove('prevent-scroll');
		} else {
			document.body.classList.add('prevent-scroll');
		}
		showSearchModal = !showSearchModal;
	}
</script>

{#if showSearchModal}
	<Modal title="Search" on:close={toggleSearch}>
		<div class="middle">
			<TextField on:input={(t) => (searchValue = t.detail)} type="text" />
		</div>
		<div class="bottom">
			<Links filter={(i) => i.label.toLowerCase().includes(searchValue?.toLowerCase())} />
		</div>
	</Modal>
{/if}

<div class="navbar-mobile-wrapper">
	<div class="fab">
		<AddToDiscord />
	</div>
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
		<button class="item" on:click={toggleSearch}>
			<div class="background" />
			<div class="icon">
				<Search />
			</div>
			Search
		</button>
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
</div>

<style lang="scss">
	.navbar-mobile-wrapper {
		position: fixed;
		flex-direction: column;
		width: 100%;
		bottom: 0;
		left: 0;
		z-index: 9;
		display: flex;
		align-items: flex-end;
		gap: 10px;

		.fab {
			margin-right: 10px;
		}
	}

	.navbar-mobile {
		display: flex;
		justify-content: space-around;
		// position: fixed;
		// bottom: 0;
		// left: 0;
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
			text-decoration: none;
			align-items: center;
			gap: 5px;
			cursor: pointer;
			border: none;
			font-family: inherit;
			appearance: none;
			background-color: transparent;

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
		.navbar-mobile-wrapper {
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
		padding: 0px 20px;
	}
</style>
