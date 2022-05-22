import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-netlify';
import { mdsvex } from 'mdsvex';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.mdx'],
	preprocess: [
		preprocess(),
		mdsvex({
			extensions: ['.mdx']
		})
	],
	kit: {
		adapter: adapter()
	}
};

export default config;
