<script lang="ts">
	import IconButton from './IconButton.svelte';
	import { X } from 'lucide-svelte';
	import { fade, fly } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';

	export let title: string;

	const dispatchCloseEvent = createEventDispatcher();

	export function close() {
		dispatchCloseEvent('close');
	}
</script>

<svelte:body
	on:keydown={(e) => {
		if (e.code === 'Escape') {
			close();
		}
	}}
/>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class="bg"
	on:click={close}
	transition:fade={{
		duration: 200
	}}
/>

<div
	class="modal"
	transition:fly={{
		y: 800,
		opacity: 1,
		duration: 300
	}}
>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div class="top">
		<h2>{title}</h2>

		<IconButton on:click={close}>
			<X slot="icon" />
		</IconButton>
	</div>
	<slot />
</div>

<style lang="scss">
	.bg {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0.5;
		background-color: rgb(0 0 0);
		z-index: 5;
	}

	.modal {
		background-color: var(--color-background);
		color: var(--color-on-background);
		bottom: 0;
		left: 0;
		position: fixed;
		display: flex;
		flex-direction: column;

		transition: transform ease-in-out 0.3s;
		width: 100%;
		max-height: 80%;
		z-index: 10;
		gap: 10px;
		border-radius: var(--border-radius-medium) var(--border-radius-medium) 0 0;

		.top {
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0px 20px;
		}
	}

	@media (min-width: 800px) {
		.modal {
			position: fixed;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);

			width: 750px;
			max-height: 600px;
			border-radius: var(--border-radius-medium);
		}
	}
</style>
