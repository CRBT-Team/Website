<script lang="ts">
	import { links, type PageLink } from './_links';

	export let filter: (item: PageLink) => unknown = (item) => item;
</script>

<div class="links">
	{#each links.filter(filter) as link}
		<a href={link.href} class="link">
			<div class="icon">
				<svelte:component this={link.icon} />
			</div>
			<span class="label">{link.label}</span>
		</a>
	{/each}
</div>

<style lang="scss">
	.links {
		display: flex;
		width: 100%;
		flex-direction: column;
		.link {
			display: flex;
			align-items: center;
			font-size: 1.1rem;
			.icon {
				padding: 20px;
				:global(svg) {
					width: 24px;
					height: 24px;
				}
			}
		}
	}
</style>
