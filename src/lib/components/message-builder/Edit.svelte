<script lang="ts">
	import type { JoinLeaveData } from '$lib/types/messageBuilder';
	import Switch from '../Switch.svelte';
	import TextField from '../TextField.svelte';
	import { messageState } from './messageState';

	messageState.subscribe(console.log);

	let showEmbeds = true;
</script>

<div class="edit">
	<h2>Edit</h2>

	<div class="fields">
		<TextField type="text" bind:value={$messageState.content} label="Message Content" large />

		<Switch label="Enable Embed" on:toggle={() => (showEmbeds = !showEmbeds)} />

		{#if showEmbeds}
			<div class="columns">
				<TextField
					type="text"
					label="Embed Author Text"
					bind:value={$messageState.embed.author.name}
				/>
				<TextField
					type="text"
					label="Embed Author URL"
					bind:value={$messageState.embed.author.url}
				/>
			</div>
			<div class="columns">
				<TextField type="text" label="Embed Title" bind:value={$messageState.embed.title} />
				<TextField type="text" label="Embed Title URL" bind:value={$messageState.embed.url} />
			</div>
			<TextField
				type="text"
				label="Embed Description"
				bind:value={$messageState.embed.description}
				large
			/>
			<TextField
				type="text"
				label="Embed Footer Text"
				bind:value={$messageState.embed.footer.text}
			/>
		{/if}
	</div>
</div>

<style lang="scss">
	.edit {
		width: 100%;

		.fields {
			display: flex;
			flex-direction: column;
			gap: 20px;

			.columns {
				display: flex;
				gap: 10px;
			}
		}
	}
</style>
