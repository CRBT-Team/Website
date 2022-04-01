<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ fetch }) => {
		const res = await fetch('/api/leaderboard');
		const leaderboard = await res.json();

		return {
			props: {
				leaderboard
			}
		};
	};
</script>

<script lang="ts">
	import type { profiles } from '@prisma/client';

	export let leaderboard: Partial<profiles>[];
</script>

<ul>
	{#each leaderboard as user, index}
		<li>
			<p>
				<b>{index + 1}.</b>
				{user.name ? `@${user.name}` : user.id} -
				<span class="purplet">
					<img src="https://cdn.discordapp.com/emojis/866116902215745576.png" alt="" />
				</span>
				{user.purplets} Purplets
			</p>
		</li>
	{/each}
</ul>

<style lang="scss">
	.purplet {
		display: inline-block;
		height: 1.2rem;
		width: 1.2rem;
		img {
			height: 100%;
			width: 100%;
		}
	}
</style>
