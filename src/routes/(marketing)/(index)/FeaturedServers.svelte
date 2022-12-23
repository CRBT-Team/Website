<script>
	import { servers } from './_featured-servers';
</script>

<div class="servers">
	<h2 class="section-title">
		Discord's <span class="emphasis-primary">best communities</span> use CRBT.
	</h2>
	<ul class="server-list">
		{#each servers as server}
			<a
				href="https://discord.com/invite/{server.inviteCode}"
				class="server"
				data-guild-id={server.id}
			>
				<div class="tooltip">
					<span class="server-name">{server.name}</span>
					<br />
					{server.category} • {server.approximateMembers}+ members
				</div>
				<img src={server.iconUrl} alt={server.name} />
			</a>
		{/each}
	</ul>
</div>

<style lang="scss">
	.servers {
		display: flex;
		background-color: var(--color-surface);
		align-items: center;
		justify-content: space-around;
		gap: 2rem;
		padding: 2rem;

		.server-list {
			gap: 1rem;
			display: flex;
			padding: 0;
		}

		.server {
			display: inline-block;
			position: relative;
			width: 60px;
			height: 60px;

			.tooltip {
				transition: all 0.1s ease-in-out;
				opacity: 0;
				scale: 1.1;
				visibility: hidden;
				width: max-content;
				background-color: var(--color-surface-variant);
				color: var(--color-on-surface-variant);
				text-align: center;
				border-radius: var(--border-radius-small);
				padding: 10px;
				position: absolute;
				z-index: 1;
				top: -10px;
				left: 50%;
				transform: translate(-50%, -100%);
				box-shadow: rgba(0, 0, 0, 0.3) 0px 3px 6px;

				&::after {
					content: ' ';
					position: absolute;
					top: 100%;
					left: 50%;
					margin-left: -5px;
					border-width: 5px;
					border-style: solid;
					border-color: var(--color-surface-variant) transparent transparent transparent;
				}

				.server-name {
					font-weight: 600;
					font-size: larger;
				}
			}
			img {
				border-radius: 60px;
				object-fit: cover;
				transition: all 0.2s ease-in-out;
			}

			&:hover {
				.tooltip {
					transition: all 0.1s ease-in-out;
					opacity: 1;
					scale: 1;
					visibility: visible;
				}

				img {
					transition: all 0.2s ease-in-out;
					scale: 1.05;
				}
			}
		}
	}

	@media (max-width: 860px) {
		.servers {
			flex-direction: column;

			.section-title {
				text-align: center;
			}
		}
	}
</style>
