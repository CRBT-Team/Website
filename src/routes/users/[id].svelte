<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ fetch, params }) => {
		const user = await fetch(`/api/users/${params.id}`).then((res) => res.json());

		return { props: { user } };
	};
</script>

<script lang="ts">
	import type { CRBTUser } from '$lib/classes/CRBTUser';

	export let user: CRBTUser;
</script>

<main>
	{#if user.profile.banner}
		<div class="banner">
			<img src={user.profile.banner.contents} alt="{user.profile.name}'s banner" />
		</div>
	{/if}
	<div class="profile">
		<div class="profile-head">
			<div class="profile-head-name">
				{#if user.profile.name}
					<h1 class="profile-name">{user.profile.name}</h1>
					<p class="profile-discord-name subtext">
						{user.discord.username}#{user.discord.discriminator}
					</p>
				{:else}
					<h1 class="profile-name">{user.discord.username}#{user.discord.discriminator}</h1>
				{/if}
			</div>
			<div class="profile-details">
				<span class="profile-detail">
					<p class="profile-detail-icon">Location</p>
					<p class="profile-detail-text subtext">{user.profile.location}</p>
				</span>
				<span class="profile-detail">
					<p class="profile-detail-icon">Pronouns</p>
					<p class="profile-detail-text subtext">{user.profile.pronouns}</p>
				</span>
				{#if user.profile.url}
					<span class="profile-detail">
						<p class="profile-detail-icon">Website</p>
						<a class="profile-detail-text profile-website subtext" href={user.profile.url}
							>{user.profile.url}</a
						>
					</span>
				{/if}
			</div>
			<div class="profile-details">
				<div class="profile-detail">
					<p class="profile-detail-icon">Joined</p>
					<p class="profile-detail-text subtext">Joined Discord on July 2nd</p>
				</div>
			</div>
		</div>
		{#if user.profile.bio || user.profile.badges.length > 0}
			<div class="profile-rows">
				<div class="profile-row">
					<p>Bio</p>
					<p class="profile-bio subtext">{user.profile.bio}</p>
				</div>
				<div class="profile-row">
					<p>Badges</p>
					<div class="profile-badges">
						{#each user.profile.badges as badge}
							<img
								class="profile-badge"
								src={badge.contents}
								alt={badge.fullName}
								title={badge.fullName}
							/>
						{/each}
					</div>
				</div>
			</div>
		{/if}
		{JSON.stringify(user, null, 2)}
	</div>
</main>

<style lang="scss">
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		.profile {
			display: flex;
			flex-direction: column;

			.profile-head {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;

				.profile-head-name {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;

					h1 {
						font-size: 2.5rem;
						margin: 0;
					}

					p {
						margin: 0;
					}
				}

				.profile-details {
					display: flex;
					align-items: center;
					justify-content: center;

					.profile-detail {
						display: flex;
						flex-direction: row;
						align-items: center;
						justify-content: center;

						p {
							margin: 0;
						}
					}
				}
			}

			.subtext {
				opacity: 0.7;
			}
		}
	}
</style>
