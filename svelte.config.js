import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-netlify';

/** @type {import('@sveltejs/kit').Config} */
export default {
	preprocess: preprocess(),
	kit: {
		adapter: adapter(),
		csrf: {
			checkOrigin: false
		}
	}
};
