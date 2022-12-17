<script lang="ts">
	import { page } from '$app/stores';
	import Crbt from '$lib/svg/crbt.svelte';
	import { Menu, Search } from 'lucide-svelte';

	let selectedTab: 'home' | 'search' | 'more' = 'home';

	console.log($page);
</script>

<nav class="navbar-mobile">
	<a
		href="/"
		class="item"
		class:selected={selectedTab === 'home'}
		on:click={() => (selectedTab = 'home')}
	>
		<div class="background" />
		<div class="icon">
			<Crbt />
		</div>
		Home
	</a>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		class="item"
		class:selected={selectedTab === 'search'}
		on:click={() => (selectedTab = 'search')}
	>
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
		on:click={() => (selectedTab = 'more')}
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
		align-items: center;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 1;
		width: 100%;
		background-color: var(--color-surface);
		padding: 20px;
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
				width: 0px;
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
			transform: translateY(100%);
			transition: transform 0.2s ease-in-out;
		}
	}
</style>
