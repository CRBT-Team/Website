import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-netlify';
import { resolve } from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess(),
	kit: {
		adapter: adapter(),
		target: 'body',
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
