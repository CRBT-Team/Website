import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-netlify';
import { resolve } from 'path';
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
		adapter: adapter(),
		target: 'body',
		prerender: {
			onError: 'continue'
		}
	},
	vite: {
		resolve: {
			alias: {
				$lib: resolve('./src/lib')
			}
		}
	}
};

export default config;
