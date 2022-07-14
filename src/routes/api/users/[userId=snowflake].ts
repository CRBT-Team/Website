import { db } from '$lib/prisma';
import type { RequestHandler } from '@sveltejs/kit';
import { validateAccess } from '$lib/api';

export const get: RequestHandler = async ({ params, request }) => {
	let { isAuthorized, tokenData } = await validateAccess(request);

	if (tokenData.userId !== params.userId) isAuthorized = false;

	const userData = await db.users.findFirst({
		where: { id: params.userId },
		select: { accentColor: true, silentJoins: true, silentLeaves: true, birthday: true, id: true }
	});

	return {
		body: {
			id: userData?.id,
			accentColor: userData?.accentColor || null,
			birthday: isAuthorized ? userData?.birthday || null : null,
			privacy: isAuthorized
				? {
						joinMessagesEnabled: !(userData?.silentJoins || false),
						leaveMessagesEnabled: !(userData?.silentLeaves || false)
				  }
				: null
		}
	};
};
