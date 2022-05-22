import type { RequestHandler } from '@sveltejs/kit';
import { readFileSync } from 'fs';
import { compile } from 'mdsvex';

export const get: RequestHandler = async ({ params, url }) => {
	try {
		const raw = await (await fetch(`${url.href.replace('blog', 'markdown')}.mdx`)).text();
		const { code: post, data: meta } = await compile(raw);

		return {
			body: {
				post,
				metadata: meta.fm
			}
		};
	} catch (e) {
		console.error(e);

		return {
			status: 404
		};
	}
};
