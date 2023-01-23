<script lang="ts">
	export let href = '';
</script>

{#if href}
	<div class="icon-btn">
		<a {href}>
			<slot name="icon" />
		</a>
	</div>
{:else}
	<button class="icon-btn" on:click>
		<slot name="icon" />
	</button>
{/if}

<style lang="scss">
	.icon-btn {
		padding: 1.5rem 1rem;
		appearance: none;
		background-color: inherit;
		color: inherit;
		border: none;
		cursor: pointer;
	}
</style>
