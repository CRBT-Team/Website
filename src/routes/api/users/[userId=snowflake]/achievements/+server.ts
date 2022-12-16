import { validateAccess } from '$lib/api';
import { prisma } from '$lib/prisma';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params, request }) => {
	let { isAuthorized, error, tokenData } = await validateAccess(request);

	if (!isAuthorized) return error;

	const userId = params.userId === '@me' ? tokenData.userId : params.userId;

	const userData = await prisma.globalAchievements.findMany({
		where: { userId }
	});

	return json(userData);
};
