<script lang="ts">
	import Avatar from '$lib/components/Avatar.svelte';
	import Button from '$lib/components/Button.svelte';
	import { PlusCircle, RefreshCw, Send, Smile } from 'lucide-svelte';

	const commands = [
		{
			name: 'user info',
			description: "Get a user's info."
		},
		{
			name: 'search',
			description: 'Search something on the web.'
		},
		{
			name: 'settings',
			description: 'Set up CRBT for your server.'
		}
	] as const;
	type Command = typeof commands[number]['name'];
	let selectedCommand: Command;
	let commandInUse: Command;
	let demoOver = false;
	let focusedCommandId = 0;

	function sendCommand() {
		commandInUse = selectedCommand;
		selectedCommand = null;
		setTimeout(() => {
			demoOver = true;
		}, 3000);
	}

	function resetDemo() {
		selectedCommand = null;
		commandInUse = null;
		demoOver = false;
	}

	function handleFocus(ev: KeyboardEvent) {
		console.log(ev.code);
		if (ev.code === 'ArrowUp' && focusedCommandId === 0) {
			focusedCommandId -= 1;
		}
		if (ev.code === 'ArrowDown' && focusedCommandId !== commands.length - 1) {
			focusedCommandId += 1;
		}
	}
</script>

<svelte:body
	on:keydown={(e) => {
		if (e.code === 'Enter') {
			if (selectedCommand) {
				sendCommand();
			} else {
				selectedCommand = commands[focusedCommandId].name;
			}
		} else handleFocus(e);
	}}
/>

<div class="app-demo-wrapper">
	<div class="app-demo">
		<div class="messages" />
		{#if !selectedCommand && !commandInUse}
			<ul class="commands">
				CRBT
				{#each commands as command, i}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<div
						on:click={() => (selectedCommand = command.name)}
						class="command"
						aria-selected={focusedCommandId === i}
					>
						<Avatar alt="CRBT" src="/assets/logos/crbt.png" size="24px" />
						<div class="meta">
							<div class="command-name">
								/{command.name}
							</div>
							<div class="command-description">
								{command.description}
							</div>
						</div>
					</div>
				{/each}
			</ul>
		{/if}

		<div class="chat-box">
			<div class="icon" class:disabled={!selectedCommand}>
				{#if selectedCommand}
					<Avatar alt="CRBT" src="/assets/logos/crbt.png" size="24px" />
				{:else}
					<PlusCircle />
				{/if}
			</div>
			<div class="text-input">
				{#if selectedCommand}
					/{selectedCommand ?? ''}
				{/if}
			</div>
			<div class="icon disabled">
				<Smile />
			</div>
			<button class="icon" on:click={sendCommand} class:disabled={!selectedCommand}>
				<Send />
			</button>
		</div>
	</div>

	<Button disabled={!demoOver} on:click={resetDemo} style="link" inline>
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
		}

		.commands {
			list-style: none;
			padding: 5px;
			display: flex;
			flex-direction: column;
			border-radius: var(--border-radius-small);
			background-color: var(--color-surface);
			width: 100%;
			margin-bottom: 5px;

			.command {
				width: 100%;
				padding: 5px;
				display: flex;
				gap: 10px;
				align-items: center;
				cursor: pointer;
				border-radius: var(--border-radius-small);

				.command-description {
					opacity: 0.5;
				}

				&:hover {
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
					opacity: 0.5;
				}

				&:hover:not(.disabled) {
					cursor: pointer;
					background-color: var(--color-surface-variant);
				}
			}
		}
	}
</style>
