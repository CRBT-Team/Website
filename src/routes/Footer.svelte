<script>
	import Discord from '$lib/svg/brands/discord.svelte';
	import KoFi from '$lib/svg/brands/ko-fi.svelte';
</script>

<footer>
	<div class="copyright">
		&copy; 2019-{new Date().getFullYear()} Clembs. All rights reserved.<br />
		CRBT is not affiliated with Discord.
	</div>

	<div class="links">
		<a href="/policy">Privacy Policy</a>
		<a href="/terms">Terms of Service</a>
		<a href="/acknowledgements">Acknowledgements</a>
	</div>

	<div class="socials">
		<a href="https://discord.gg/AvwhNtsgAC">
			<Discord />
		</a>
		<!-- <a href="/guilded">
			<Guilded />
		</a> -->
		<a href="https://ko-fi.com/clembs">
			<KoFi />
		</a>
	</div>
</footer>

<style lang="scss">
	footer {
		// background: var(--color-surface);
		width: 100%;
		// min-width: 1350px;
		margin: auto auto 0 auto;
		padding: 1rem;
		display: flex;
		gap: 5rem;
		justify-content: space-around;
		align-items: center;
		// color: var(--color-on-surface);
		// fill: var(--color-on-surface);

		a {
			text-decoration: none;
			font-weight: 600;
			&:hover {
				text-decoration: underline;
				fill: var(--color-on-primary-container);
				color: var(--color-on-primary-container);
			}
		}

		.links {
			display: flex;
			gap: 3rem;
		}

		.socials {
			display: flex;
			gap: 0.5rem;
			a {
				padding: 0.5rem;
				border-radius: var(--border-radius-small);

				&:hover {
					background-color: var(--color-surface-variant);
					color: var(--color-on-surface-variant);
				}

				:global(svg) {
					width: 2rem;
					height: 2rem;
				}
			}
		}
	}

	@media (max-width: 800px) {
		footer {
			flex-direction: column;
			text-align: center;
			gap: 1.1rem;
			.links {
				flex-direction: column;
				gap: 1.1rem;
			}
			padding-bottom: 150px;
		}
	}
</style>
