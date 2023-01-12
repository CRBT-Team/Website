<script lang="ts">
	import Avatar from '$lib/components/Avatar.svelte';
	import Button from '$lib/components/Button.svelte';
	import { PlusCircle, RefreshCw, Send } from 'lucide-svelte';

	const commands = [
		{
			name: 'user info',
			description: "Get a user's info."
		},
		{
			name: 'search',
			description: 'Search something on the web.'
		}
	] as const;
	type Command = typeof commands[number]['name'];
	let selectedCommand: Command;
	let commandInUse: Command;
	let demoOver = false;

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
</script>

<svelte:body
	on:keypress={(e) => {
		if (e.code === 'Enter' && selectedCommand) {
			sendCommand();
		}
	}}
/>

<div class="app-demo-wrapper">
	<div class="app-demo">
		{#if !selectedCommand && !commandInUse}
			<ul class="commands">
				{#each commands as command}
					<li on:click={() => (selectedCommand = command.name)} class="command">
						<Avatar alt="CRBT" src="/assets/logos/crbt.png" size="24px" />
						<div class="meta">
							<div class="command-name">
								/{command.name}
							</div>
							<div class="command-description">
								{command.description}
							</div>
						</div>
					</li>
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
			<div on:click={sendCommand} class="icon" class:disabled={!selectedCommand}>
				<Send />
			</div>
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
		min-width: 300px;
		padding: 5px;
		height: 200px;

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

				&:hover {
					background-color: var(--color-surface-variant);
				}
			}
		}

		.chat-box {
			margin-top: auto;
			padding: 10px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 1.1rem;
			border-radius: var(--border-radius-small);
			background-color: var(--color-surface);
			width: 100%;
			gap: 5px;

			.text-input {
				width: 100%;
				height: 100%;
			}

			.icon {
				&.disabled {
					cursor: not-allowed;
					opacity: 0.5;
				}
			}
		}
	}
</style>
