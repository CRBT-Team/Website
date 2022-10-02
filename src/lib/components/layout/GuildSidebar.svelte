<script lang="ts">
	import { page } from '$app/stores';
	import { Plus } from 'lucide-svelte';
	import type { RESTGetAPICurrentUserGuildsResult } from 'discord-api-types/v10';

	export let guilds: RESTGetAPICurrentUserGuildsResult;
	// export let currentGuildId: string | null;

	$: currentGuildId = $page.params.id;
</script>

<nav class="guild-sidebar-wrapper" aria-label="servers">
	<div class="scroller">
		<div class="guilds">
			{#each guilds as guild}
				<div
					class="guild"
					data-guild-id={guild.id}
					class:selected={guild.id === currentGuildId}
					role="listitem"
				>
					<div class="pill" />
					<a href="/dashboard/{guild.id}">
						{#if guild.icon}
							<img
								class="icon"
								src={guild.icon
									? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.webp?size=96`
									: '/assets/default_pfp.svg'}
								alt=" "
								width="44"
								height="44"
							/>
						{:else}
							<div class="icon no-icon">
								{guild.name
									.split(' ')
									.map((word) => word.charAt(0))
									.join('')}
							</div>
						{/if}
					</a>
				</div>
			{/each}
			<div class="guild" role="listitem">
				<div class="pill" />
				<a href="/invite">
					<div class="icon no-icon">
						<Plus />
					</div>
				</a>
			</div>
		</div>
	</div>
</nav>

<style lang="scss">
	.guild-sidebar-wrapper {
		display: flex;
		background-color: var(--color-secondary-container);
		color: var(--color-on-secondary-container);
		// overflow: hidden scroll;
		position: relative;
		z-index: 2;
		flex-shrink: 0;
		overflow: hidden;
		flex-direction: column;

		.scroller {
			overflow: hidden scroll;
			scrollbar-width: none;
			height: 100%;
			&::-webkit-scrollbar {
				display: none;
			}
		}

		.guilds {
			margin-top: 10px;
			display: flex;
			gap: 12px;
			flex-direction: column;
			height: 100%;
			position: relative;
		}

		.guild {
			display: flex;
			align-items: center;
			gap: 6px;
			width: 68px;
			transition: all 0.2s ease-in-out;

			.icon {
				transition: all 0.2s ease-in-out;
				border-radius: 20px;

				height: 44px;
				width: 44px;
				display: flex;
				align-items: center;
				justify-content: center;
				color: var(--color-on-secondary);
				text-decoration: none;
				background-color: var(--color-secondary);

				&:hover {
					transition: all 0.2s ease-in-out;
					box-shadow: rgba(0, 0, 0, 0.3) 0px 3px 6px;
					border-radius: 12px;
				}
			}

			.pill {
				height: 13px;
				width: 6px;
				background-color: var(--color-on-primary-container);
				border-radius: 0 8px 8px 0;
				opacity: 0;
				display: block;
			}
			&.selected {
				.icon {
					border-radius: 14px;
					background-color: var(--color-primary);
					// box-shadow: rgba(0, 0, 0, 0.3) 0px 3px 6px;
				}
				.pill {
					opacity: 1;
				}
			}
		}
	}
</style>
