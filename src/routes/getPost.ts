import type { RequestHandler } from '@sveltejs/kit';
import { readFileSync } from 'fs';
import { resolve } from 'path';

export const get: RequestHandler = ({ url }) => {
	const req = url.searchParams.get('post');
	try {
		const res = readFileSync(resolve(`./static/blogposts/${req}.md`), 'utf-8');
		return {
			body: res,
			status: 200
		};
	} catch (e) {
		return {
			status: 404
		};
	}
};
