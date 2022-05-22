import type { RequestHandler } from '@sveltejs/kit';
import { readFileSync } from 'fs';
import { compile } from 'mdsvex';

export const get: RequestHandler = async ({ params }) => {
	try {
		const raw = readFileSync(`./src/lib/blog/${params.post}.md`, 'utf8');
		const { code: post, data: meta } = await compile(raw);

		return {
			body: {
				post,
				metadata: meta.fm
			}
		};
	} catch (e) {
		return {
			status: 404,
			body: {
				error: e.message
			}
		};
	}
};
