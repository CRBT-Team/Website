<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Divider from '$lib/components/Divider.svelte';
	import MessageBuilder from '$lib/components/message-builder/MessageBuilder.svelte';
	import type {
		APIGuildCategoryChannel,
		APINewsChannel,
		APITextChannel
	} from 'discord-api-types/v10';
	import type { PageServerData } from './$types';

	export let data: PageServerData;

	type ValidTextChannel = APITextChannel | APINewsChannel;
	type CategoriesWithChildren = (APIGuildCategoryChannel & {
		children: ValidTextChannel[];
	})[];

	const categories = data.channels
		.filter((c) => c.type === 4)
		.sort((a: APIGuildCategoryChannel, b: APIGuildCategoryChannel) => a.position - b.position)
		.map((category) => ({
			...category,
			children: data.channels
				.filter((c) => (c.type === 0 || c.type === 5) && c.parent_id === category.id)
				.sort((a: ValidTextChannel, b: ValidTextChannel) => a.position - b.position)
		})) as CategoriesWithChildren;

	let newState: typeof data = Object.create(data);
</script>

<form method="post">
	<select name="servers" id="guilds">
		{#each categories as category}
			<optgroup label={category.name}>
				{#each category.children as channel}
					<option selected={channel.id === data.joinChannel} value={channel.id}>
						{channel.name}
					</option>
				{/each}
			</optgroup>
		{/each}
	</select>

	<Divider />

	<MessageBuilder messageData={data.joinMessage} />

	<Button>Hi</Button>
	<!-- <pre>{JSON.stringify(data.channels, null, 2)}</pre> -->
</form>
