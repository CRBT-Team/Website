import { db } from '$lib/db';
import 'dotenv/config';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ url }) => {
	const limit = url.searchParams.get('limit') ?? '20';
	let lb = await db.profiles.findMany({
		where: { purplets: { gt: 0 } },
		orderBy: { purplets: 'desc' },
		take: parseInt(limit),
		select: { id: true, purplets: true, name: true }
	});

	return {
		status: 200,
		body: JSON.stringify(lb)
	};
};
