<script lang="ts">
	import type { JoinLeaveData } from '$lib/types/messageBuilder';
	import Edit from './Edit.svelte';
	import { messageState } from './messageState';
	import Preview from './Preview.svelte';

	export let messageData: Partial<JoinLeaveData>;

	messageState.set(messageData);
</script>

<div class="message-builder">
	<Edit />

	<Preview />
</div>

<style lang="scss">
	.message-builder {
		display: flex;
		gap: 50px;
	}
</style>
