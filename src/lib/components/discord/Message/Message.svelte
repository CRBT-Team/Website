<script lang="ts">
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
	<div class="message-author-profile-picture">
		<img
			src="https://cdn.discordapp.com/avatars/{message.author.id}/{message.author.avatar}.webp"
			alt="{message.author.username}'s profile picture"
		/>
	</div>

	<div class="message">
		<div class="message-author">
			<span class="message-author-name">
				{message.author.username}
			</span>
			{#if message.author.bot}
				<div class="message-author-badge-bot">
					<Check /> BOT
				</div>
			{/if}
			<span class="message-timestamp">
				Today at {getTime()}
			</span>
		</div>
		{message.content}
	</div>

	<!-- {#if message.content} -->
</div>
