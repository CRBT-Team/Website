<script lang="ts">
	import { Menu } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';

	let hideSidebar = false;

	const dispatchMenuBtn = createEventDispatcher();
</script>

<header class="top-navbar">
	<div
		class="menu-button"
		on:click={() => {
			hideSidebar = !hideSidebar;
			dispatchMenuBtn('menu', hideSidebar);
		}}
	>
		<Menu size={20} stroke="2" />
	</div>

	<div class="heading-logo">
		<img src="/assets/logos/CRBT-wordmark-dark.png" alt="CRBT" />
	</div>
</header>

<style lang="scss">
	.top-navbar {
		width: 100%;
		height: 60px;
		display: flex;
		background-color: var(--color-surface);

		.menu-button {
			display: flex;
			background-color: var(--color-secondary-container);
			align-items: center;
			justify-content: center;
			// height: 60px;
			padding: 0 24px;
			cursor: pointer;
			// border-bottom: 2px solid var(--color-outline);

			:global(&:active svg) {
				width: 12px;
			}
		}

		.heading-logo {
			display: flex;
			align-items: center;
			height: 60px;
			width: 256px;

			img {
				position: relative;
				left: 22px;
				height: 40px;
			}
		}
	}
</style>
