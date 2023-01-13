<script lang="ts">
	import Avatar from '$lib/components/Avatar.svelte';
	import { MessageFlags, type APIMessage } from 'discord-api-types/v10';
	import { Check } from 'lucide-svelte';
	import './Message.scss';
	import { toHTML } from 'discord-markdown';
	import InlineLoading from '$lib/components/InlineLoading.svelte';

	export let message: Partial<APIMessage>;

	function getTime() {
		const now = new Date();

		return now.toTimeString().split(':').slice(0, 2).join(':');
	}
</script>

<div class="message-root">
	<Avatar
		src="https://cdn.discordapp.com/avatars/{message.author.id}/{message.author
			.avatar}.webp?size=64"
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
			{#if message.flags === MessageFlags.Loading}
				<InlineLoading /> {message.author.username} is thinking...
			{/if}
			{@html message.content ? toHTML(message.content) : ''}
		</div>
		{#each message.embeds || [] as embed}
			<div class="embed-wrapper" style="border-color: #{embed.color?.toString(16) ?? 'F27187'}">
				<div class="embed-content">
					{#if embed.author}
						<div class="embed-author">
							<Avatar src={embed.author?.icon_url} alt="Embed author icon" size="24px" />
							<a href={embed.author?.url} class="embed-author-name">
								{embed.author?.name ?? ''}
							</a>
						</div>
					{/if}
					<h3 class="embed-title">
						{@html embed.title ? toHTML(embed.title, { embed: true }) : ''}
					</h3>
					<p class="embed-description">
						{@html embed.description ? toHTML(embed.description, { embed: true }) : ''}
					</p>
					<div class="embed-fields" role="list">
						{#each embed.fields ?? [] as field}
							<div class="field" role="listitem">
								<h5 class="field-name">{field.name}</h5>
								<p class="field-value">
									{@html toHTML(field.value, { embed: true })}
								</p>
							</div>
						{/each}
					</div>
				</div>
				{#if embed.thumbnail}
					<div class="embed-thumbnail">
						<img
							src={embed.thumbnail.url}
							alt="Embed thumbnail"
							width={embed.thumbnail.width}
							height={embed.thumbnail.height}
						/>
					</div>
				{/if}
			</div>
		{/each}
	</div>
</div>
