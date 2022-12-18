<script lang="ts">
	import TextField from '$lib/components/TextField.svelte';
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';
	import Links from '../WebsiteLink/Links.svelte';

	export let show: boolean;
	const closeSearch = createEventDispatcher();
	let searchValue = '';
</script>

{#if show}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		class="bg"
		on:click={() =>
			closeSearch('close', () => {
				show = false;
				return show;
			})}
	/>
{/if}

<div class="search-flyout" class:show transition:fade>
	<div class="top">
		<span class="tab-puller" />
		<TextField on:input={(t) => (searchValue = t.detail)} type="text" label="Search" />
	</div>
	<div class="bottom">
		<Links filter={(i) => i.label.toLowerCase().includes(searchValue?.toLowerCase())} />
	</div>
</div>

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
		transform: translateY(150%);
		bottom: 0;
		left: 0;
		position: fixed;
		transition: transform ease-in-out 0.3s;
		width: 100%;
		max-height: 70%;
		padding: 10px 20px 0px 20px;
		z-index: 8;
		display: flex;
		flex-direction: column;
		align-items: center;
		border-radius: var(--border-radius-medium) var(--border-radius-medium) 0 0;

		&.show {
			transform: translateY(-99px);
			transition: transform ease-in-out 0.3s;
		}

		.top {
			width: 100%;
			position: sticky;
			top: 0;
			left: 0;
			background-color: var(--color-surface);
			display: flex;
			flex-direction: column;
			align-items: center;

			.tab-puller {
				width: 70px;
				height: 3px;
				border-radius: 10px;
				background-color: var(--color-surface-variant);
				margin-bottom: 20px;
			}
		}

		.bottom {
			margin-top: 20px;
			overflow-y: scroll;
			width: 100%;
		}
	}
</style>
