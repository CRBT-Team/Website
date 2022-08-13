import { validateAccess } from '$lib/api';
import { db } from '$lib/prisma';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params, request }) => {
	let { isAuthorized, error, tokenData } = await validateAccess(request);

	if (!isAuthorized) return error;

	const userId = params.userId === '@me' ? tokenData.userId : params.userId;

	const userData = await db.achievements.findMany({
		where: { userId },
		select: { achievedAt: true, achievement: true, progression: true, userId: true }
	});

	return {
		body: userData
	};
};
