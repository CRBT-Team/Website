<script context="module" lang="ts">
	import type { ErrorLoad } from '@sveltejs/kit';

	export const load: ErrorLoad = ({ status, error }) => {
		return {
			props: {
				status,
				message: error.message,
				stack: error.stack
			}
		};
	};
</script>

<script lang="ts">
	import MetaTags from '$lib/components/MetaTags.svelte';

	export let status: number;
	export let message: string;
	export let stack: string;
</script>

<main>
	{#if status === 404}
		<MetaTags title="CRBT - Not found" />

		<h1>Page not found</h1>
		<p>We're sorry, but the page you were looking for does not exist.</p>
		<p>
			<a href="/" class="Button">Home Page</a>
		</p>
	{:else}
		<MetaTags title="CRBT - Error" />

		<h1>{status}</h1>

		<h2>
			<pre>{message}</pre>
		</h2>
		<pre>{stack}</pre>
	{/if}
</main>

<style lang="scss">
	main {
		padding: 1rem;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.Button {
		display: inline-block;
		color: #4a0920;
		background-color: white;

		border-radius: 1rem;
		font-size: 1.5rem;
		padding: 0.5rem 1.2rem;

		transition: background-color 200ms;
		transition: color 200ms;

		&:hover {
			background: #f17086;
			color: white;
			box-shadow: rgba(0, 0, 0, 35%) 0px 3px 14px 0px;
		}
		&:active {
			background: #ffb9d1;
			color: #4a0920;
			// transition: opacity 50ms;
		}
	}
</style>
