<script lang="ts">
	import Avatar from '$lib/components/Avatar.svelte';
	import Button from '$lib/components/Button.svelte';
	import Message from '$lib/components/discord/Message/Message.svelte';
	import { MessageFlags, type APIUser } from 'discord-api-types/v10';
	import { Gift, PlusCircle, RefreshCw, Send, Smile } from 'lucide-svelte';
	import { slide } from 'svelte/transition';
	import { commands as allCommands } from './_commands';

	let selectedCommandId: number;
	let usedCommandId: number;
	let focusedCommandId = 1;
	let isDemoOver = false;
	let commands = allCommands.sort((a, b) => 0.5 - Math.random()).slice(0, 3);

	function sendCommand() {
		usedCommandId = selectedCommandId;
		selectedCommandId = null;
		setTimeout(() => (isDemoOver = true), 1500);
	}

	const author: APIUser = {
		avatar: '90f936a706b20f0798eb271bd16308d3',
		global_name: 'CRBT',
		username: 'CRBT',
		discriminator: '0456',
		bot: true,
		id: '595731552709771264'
	};

	function resetDemo() {
		commands = allCommands.sort((a, b) => 0.5 - Math.random()).slice(0, 3);
		selectedCommandId = null;
		usedCommandId = null;
		isDemoOver = false;
	}

	function handleFocus(ev: KeyboardEvent) {
		if (!focusedCommandId) {
			focusedCommandId = 1;
		}
		if (ev.code === 'ArrowUp' && focusedCommandId !== 1) {
			ev.preventDefault();
			focusedCommandId -= 1;
		}
		if (ev.code === 'ArrowDown' && focusedCommandId !== commands.length) {
			ev.preventDefault();
			focusedCommandId += 1;
		}
	}
</script>

<div class="app-demo-wrapper">
	<div class="demo-header-text">
		<h3>Try me out!</h3>
	</div>
	<!-- svelte-ignore a11y-positive-tabindex -->
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<div
		class="app-demo"
		tabindex="1"
		on:keydown={(e) => {
			if (e.code === 'Enter') {
				if (selectedCommandId) {
					sendCommand();
				} else {
					selectedCommandId = focusedCommandId;
				}
			} else handleFocus(e);
		}}
	>
		<div class="messages">
			{#if usedCommandId}
				<div in:slide class="message">
					{#await new Promise((resolve) => setTimeout(resolve, 1500))}
						<Message
							message={{
								author,
								flags: MessageFlags.Loading
							}}
						/>
					{:then}
						<Message
							message={{
								author,
								content: commands[usedCommandId - 1].content,
								embeds: [commands[usedCommandId - 1].embed]
							}}
						/>
					{/await}
				</div>
			{/if}
		</div>
		{#if !selectedCommandId && !usedCommandId}
			<div class="top-part" in:slide on:mouseenter={() => (focusedCommandId = null)}>
				<div class="bot-profile">
					<Avatar alt="CRBT" src="/assets/logos/crbt.png" size="20px" />
					CRBT
				</div>
				{#each commands as command, id}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
					<div
						on:click={() => {
							selectedCommandId = id + 1;
							console.log(selectedCommandId);
						}}
						class="command clickable"
						aria-selected={focusedCommandId === id + 1}
					>
						<div class="meta">
							<div class="command-name">
								/{command.name}
							</div>
							<div class="command-description">
								{command.description}
							</div>
						</div>

						<span class="command-description"> CRBT </span>
					</div>
				{/each}
			</div>
		{:else if selectedCommandId}
			<div class="top-part" in:slide>
				<div class="command">
					<div class="meta">
						<span class="command-name">
							/{commands[selectedCommandId - 1].name}
						</span>
						<span class="command-description">
							{commands[selectedCommandId - 1].description}
						</span>
					</div>
				</div>
			</div>
		{/if}

		<div class="chat-box">
			<div class="icon" class:disabled={!selectedCommandId}>
				{#if selectedCommandId}
					<Avatar alt="CRBT" src="/assets/logos/crbt.png" size="24px" />
				{:else}
					<PlusCircle />
				{/if}
			</div>
			<div class="text-input">
				{#if !usedCommandId}
					/{commands[selectedCommandId - 1]?.name ?? ''}
				{/if}
			</div>
			<div class="icon disabled">
				<Gift />
			</div>
			<div class="icon disabled">
				<Smile />
			</div>
			<button class="icon" on:click={sendCommand} class:disabled={!selectedCommandId}>
				<Send />
			</button>
		</div>
	</div>

	<Button disabled={!isDemoOver} on:click={resetDemo} style="link" inline>
		<RefreshCw slot="icon" /> Restart demo
	</Button>
</div>

<style lang="scss">
	.app-demo-wrapper {
		width: 500px;
		max-width: 600px;
	}

	.demo-header-text {
		display: flex;
		justify-content: flex-end;

		h3 {
			font-size: 1.3rem;
			transform: rotate(8deg) translate(25px, 30px);
			background-color: var(--color-primary);
			color: var(--color-on-primary);
			border-radius: var(--border-radius-medium);
			padding: 0.5rem 1rem;
		}
	}

	.app-demo {
		border-radius: var(--border-radius-medium);
		border: 2px solid var(--color-surface);
		padding: 15px;
		width: 100%;
		min-height: 400px;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		margin-bottom: 1rem;

		.messages {
			flex: 1;
			padding: 10px 0;
			height: 100%;
			display: flex;
			align-items: flex-end;
		}

		@keyframes swipe-up {
			0% {
				transform: translateY(-100%);
			}
			100% {
				transform: translateY(0);
			}
		}

		.top-part {
			&:empty {
				transform: translateY(-100%);
			}
			animation: swipe-up 0.2 ease-in;
			list-style: none;
			padding: 5px;
			display: flex;
			flex-direction: column;
			border-radius: var(--border-radius-small);
			background-color: var(--color-surface);
			width: 100%;
			margin-bottom: 5px;
			transition: max-height 0.2s ease-in;
			max-height: max-content;

			.bot-profile {
				padding: 5px;
				align-items: center;
				display: flex;
				gap: 5px;
			}

			.command {
				width: 100%;
				padding: 10px;
				display: flex;
				gap: 10px;
				align-items: center;
				border-radius: var(--border-radius-small);
				user-select: none;
				justify-content: space-between;

				.command-description {
					opacity: 0.5;
				}

				&:is(:hover, [aria-selected='true']):is(.clickable) {
					cursor: pointer;
					background-color: var(--color-surface-variant);
				}
			}
		}

		.chat-box {
			z-index: 2;
			padding: 5px;
			display: flex;
			justify-content: space-evenly;
			align-items: center;
			font-size: 1.1rem;
			border-radius: var(--border-radius-small);
			background-color: var(--color-surface);
			color: var(--color-on-surface);
			width: 100%;
			gap: 5px;

			.text-input {
				width: 100%;
			}

			.icon {
				padding: 0.5rem;
				border: none;
				font-family: inherit;
				background-color: var(--color-surface-variant);
				color: var(--color-on-surface-variant);
				border-radius: var(--border-radius-small);
				background-color: var(--color-surface);

				&.disabled {
					cursor: not-allowed;
					color: var(--color-on-surface);
					opacity: 0.5;
				}

				&:hover:not(.disabled, .clickable) {
					cursor: pointer;
					color: var(--color-on-primary);
					background-color: var(--color-primary);
				}
			}
		}
	}

	@media (max-width: 900px) {
		.app-demo-wrapper {
			width: 100% !important;
		}
	}
</style>
