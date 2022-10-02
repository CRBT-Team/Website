import { db } from '$lib/prisma';
import type { RequestHandler } from '@sveltejs/kit';
import badges from '$lib/json/badges.json';
import { validateAccess } from '$lib/api';

export const GET: RequestHandler = async ({ params, request }) => {
	let { isAuthorized, error, tokenData } = await validateAccess(request, { userId: params.userId });

	if (!isAuthorized) return error;

	const userId = params.userId === '@me' ? tokenData.userId : params.userId;

	const userData = await db.users.findFirst({
		where: { id: userId },
		select: {
			accentColor: true,
			silentJoins: true,
			silentLeaves: true,
			birthday: true,
			id: true,
			crbtBadges: true
		}
	});

	return {
		body: {
			id: userData?.id,
			accentColor: userData?.accentColor || null,
			birthday: isAuthorized ? userData?.birthday || null : null,
			crbtBadges: userData?.crbtBadges.map((b) => ({ id: b, ...badges[b] })) || null,
			privacy: {
				joinMessagesEnabled: !(userData?.silentJoins || false),
				leaveMessagesEnabled: !(userData?.silentLeaves || false)
			}
		}
	};
};
