import type { RequestHandler } from '@sveltejs/kit';
import { compile } from 'mdsvex';

export const get: RequestHandler = async ({ url }) => {
	try {
		const raw = await (await fetch(`${url.href.replace('blog', 'markdown')}.mdx`)).text();
		const {
			code: post,
			data: { fm }
		} = await compile(raw);

		return {
			body: {
				post,
				metadata: fm
			}
		};
	} catch (e) {
		console.error(e);

		return {
			status: 404
		};
	}
};
