import { db } from '$lib/prisma';
import type { RequestHandler } from '@sveltejs/kit';
import badges from '$lib/json/badges.json';
import { validateAccess } from '$lib/api';

interface Reminder {
	expiration: number;
	data: {
		destination: string;
		subject: string;
		userId: string;
		url: string;
	};
}

export const GET: RequestHandler = async ({ params, request }) => {
	let { isAuthorized, error, tokenData } = await validateAccess(request, { userId: params.userId });

	if (!isAuthorized) return error;

	const userId = params.userId === '@me' ? tokenData.userId : params.userId;

	const userData = (
		(await db.timeouts.findMany({
			where: { type: 'REMINDER' },
			select: {
				expiration: true,
				data: true
			}
		})) as any as Reminder[]
	).filter((r) => r.data.userId === userId);

	return {
		body: userData.map((r) => ({
			expiresAt: r.expiration,
			subject: r.data.subject,
			discordUrlPath: r.data.url,
			destinationChannel: r.data.destination
		}))
	};
};
