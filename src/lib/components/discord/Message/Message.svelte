<script lang="ts">
	import Avatar from '$lib/components/Avatar.svelte';
	import type { APIMessage } from 'discord-api-types/v10';
	import { Check } from 'lucide-svelte';
	import './Message.scss';

	export let message: Partial<APIMessage>;

	function getTime() {
		const now = new Date();

		return now.toTimeString().split(':').slice(0, 2).join(':');
	}
</script>

<div class="message-root">
	<Avatar
		src="https://cdn.discordapp.com/avatars/{message.author.id}/{message.author.avatar}.webp"
		alt="{message.author.username}'s profile picture"
		size="35px"
	/>

	<div class="message">
		<div class="header">
			<div class="author-profile">
				<span class="name">
					{message.author.username}
				</span>
				{#if message.author.bot}
					<div class="bot-badge">
						<Check /> BOT
					</div>
				{/if}
			</div>
			<time datetime={new Date().toISOString()} class="message-timestamp">
				Today at {getTime()}
			</time>
		</div>
		<div class="message-content">
			{message.content ?? ''}
		</div>
		{#if message.embeds && message.embeds.length}
			{#each message.embeds as embed}
				<div class="embed-wrapper">
					<div class="embed">
						<h3 class="embed-title">
							{embed.title}
						</h3>
						<p class="embed-description">
							{embed.description}
						</p>
					</div>
				</div>
			{/each}
		{/if}
	</div>
</div>
