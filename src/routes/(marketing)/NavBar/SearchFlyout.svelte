<script lang="ts">
	import TextField from '$lib/components/TextField.svelte';
	import { createEventDispatcher } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import Links from '../WebsiteLink/Links.svelte';
	import { swipe } from 'svelte-gestures';

	const dispatchCloseEvent = createEventDispatcher();
	const close = () => dispatchCloseEvent('close', () => false);

	let searchValue = '';
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class="bg"
	on:click={close}
	transition:fade={{
		duration: 200
	}}
/>

<div
	class="search-flyout"
	transition:fly={{
		y: 800,
		opacity: 1,
		duration: 300
	}}
>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		class="top"
		use:swipe={{
			minSwipeDistance: 0,
			timeframe: 0,
			touchAction: ''
		}}
		on:swipe={(e) => {
			console.log(e);
			if (e.detail.direction === 'bottom') {
			}
		}}
	>
		<span class="tab-puller" />
	</div>
	<div class="middle">
		<TextField on:input={(t) => (searchValue = t.detail)} type="text" label="Search" />
	</div>
	<div class="bottom">
		<Links filter={(i) => i.label.toLowerCase().includes(searchValue?.toLowerCase())} />
	</div>
</div>

<!-- {/if} -->
<style lang="scss">
	.bg {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgb(0 0 0 / 0.6);
		z-index: 5;
	}

	.search-flyout {
		background-color: var(--color-surface);
		color: var(--color-on-surface);
		// transform: translateY(150%);
		bottom: 0;
		left: 0;
		position: fixed;
		transition: transform ease-in-out 0.3s;
		width: 100%;
		max-height: 70%;
		z-index: 8;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 10px;
		border-radius: var(--border-radius-medium) var(--border-radius-medium) 0 0;

		// &.show {
		// 	transform: translateY(0);
		// 	transition: transform ease-in-out 0.3s;
		// }

		.top {
			width: 100%;
			display: grid;
			place-items: center;
			padding: 15px;

			.tab-puller {
				display: block;
				width: 70px;
				height: 3px;
				border-radius: 10px;
				background-color: var(--color-on-surface);
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
	}
</style>
