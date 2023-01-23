<script lang="ts">
	import Message from '../discord/Message/Message.svelte';
	import { messageState } from './messageState';

	const crbtInfo = {
		id: '595731552709771264',
		username: 'CRBT',
		avatar: '1c0a58206c44a80b62f28997133d5786',
		discriminator: '0456'
	};
</script>

<div class="preview">
	<h2>Preview</h2>
	<Message
		message={{
			content: $messageState.content,
			embeds: [$messageState.embed],
			author: crbtInfo
		}}
	/>
</div>

<style lang="scss">
	.preview {
		width: 100%;
	}
</style>
