import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	optimizeDeps: {
		esbuildOptions: {
			target: 'es2020'
		}
	},
	build: {
		target: 'es2020'
	}
});
