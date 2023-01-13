<script lang="ts">
	import Avatar from '$lib/components/Avatar.svelte';
	import Button from '$lib/components/Button.svelte';
	import Message from '$lib/components/discord/Message/Message.svelte';
	import { Gift, PlusCircle, RefreshCw, Send, Smile } from 'lucide-svelte';
	import { commands } from './_commands';

	let selectedCommandId: number;
	let usedCommandId: number;
	let focusedCommandId = 1;
	let isDemoOver = false;

	function sendCommand() {
		usedCommandId = selectedCommandId;
		selectedCommandId = null;
		setTimeout(() => {
			isDemoOver = true;
		}, 1000);
	}

	function resetDemo() {
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
		if (ev.code === 'ArrowDown' && focusedCommandId !== commands.size) {
			ev.preventDefault();
			focusedCommandId += 1;
		}
	}
</script>

<svelte:body
	on:keydown={(e) => {
		if (e.code === 'Enter') {
			if (selectedCommandId) {
				sendCommand();
			} else {
				selectedCommandId = focusedCommandId;
			}
		} else handleFocus(e);
	}}
/>

<div class="app-demo-wrapper">
	<div class="app-demo">
		<div class="messages">
			{#if usedCommandId}
				<Message
					message={{
						author: {
							avatar: '08623d6756f476051146d9fb0f211da2',
							username: 'CRBT',
							discriminator: '0456',
							bot: true,
							id: '595731552709771264'
						},
						embeds: [commands.get(usedCommandId).embed]
					}}
				/>
			{/if}
		</div>
		<div class="top-part" on:mouseenter={() => (focusedCommandId = null)}>
			{#if !selectedCommandId && !usedCommandId}
				<div class="bot-profile">
					<Avatar alt="CRBT" src="/assets/logos/crbt.png" size="20px" />
					CRBT
				</div>
				{#each Array.from(commands) as [id, command]}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<div
						on:click={() => (selectedCommandId = id)}
						class="command clickable"
						aria-selected={focusedCommandId === id}
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
			{:else if selectedCommandId}
				<div class="command">
					<div class="meta">
						<span class="command-name">
							/{commands.get(selectedCommandId).name}
						</span>
						<span class="command-description">
							{commands.get(selectedCommandId).description}
						</span>
					</div>
				</div>
			{/if}
		</div>

		<div class="chat-box">
			<div class="icon" class:disabled={!selectedCommandId}>
				{#if selectedCommandId}
					<Avatar alt="CRBT" src="/assets/logos/crbt.png" size="24px" />
				{:else}
					<PlusCircle />
				{/if}
			</div>
			<div class="text-input">
				{#if selectedCommandId}
					/{commands.get(selectedCommandId).name ?? ''}
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
	.app-demo {
		border-radius: var(--border-radius-medium);
		border: 2px solid var(--color-surface);
		width: 100%;
		min-width: 400px;
		padding: 5px;
		height: 300px;
		display: flex;
		flex-direction: column;

		.messages {
			flex: 1;
			padding: 5px;
		}

		.top-part {
			&:empty {
				display: none;
			}
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
				padding: 2px;
				align-items: center;
				display: flex;
				gap: 5px;
			}

			.command {
				width: 100%;
				padding: 5px;
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
				background-color: var(--color-surface);
				border-radius: var(--border-radius-small);

				&.disabled {
					cursor: not-allowed;
					color: var(--color-on-surface);
					opacity: 0.5;
				}

				&:hover:not(.disabled, .clickable) {
					cursor: pointer;
					background-color: var(--color-surface-variant);
				}
			}
		}
	}
</style>
