import { prisma } from '$lib/prisma';
import { json, type RequestHandler } from '@sveltejs/kit';
import badges from '$lib/util/badges';
import { validateAccess } from '$lib/api';

export const GET: RequestHandler = async ({ params, request }) => {
	let { isAuthorized, error, tokenData } = await validateAccess(
		request,
		{ userId: params.userId },
		false
	);

	if (!isAuthorized) return error;

	const userId = params.userId === '@me' ? tokenData.userId : params.userId;
	const isSelf = params.userId === '@me' || tokenData.userId === params.userId;

	const userData = await prisma.user.findFirst({
		where: { id: userId },
		select: {
			id: true,
			accentColor: true,
			silentJoins: true,
			silentLeaves: true,
			telemetry: true,
			crbtBadges: true
		}
	});

	return json({
		...userData,
		crbtBadges: userData?.crbtBadges.map((b) => ({ id: b, ...badges[b] })) || null,
		...(isSelf
			? {
					telemetry: userData.telemetry ?? true,
					silentJoins: userData.silentJoins ?? false,
					silentLeaves: userData.silentLeaves ?? false
			  }
			: {})
	});
};
