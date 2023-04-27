import { prisma } from '$lib/prisma';
import { json, type RequestHandler } from '@sveltejs/kit';
import badges from '$lib/util/badges';
import { validateAccess } from '$lib/api';

export const GET: RequestHandler = async ({ params, request }) => {
	let { errorMessage, tokenData } = await validateAccess(
		request,
		{ userId: params.userId },
		{ auth: false }
	);

	if (errorMessage) return errorMessage;

	const userId = params.userId === '@me' ? tokenData.userId : params.userId;
	const isSelf = tokenData && (params.userId === '@me' || tokenData?.userId === params.userId);

	const userData = await prisma.user.findFirst({
		where: { id: userId },
		select: {
			id: true,
			accent_color: true,
			silent_joins: true,
			silent_leaves: true,
			telemetry: true,
			crbt_badges: true
		}
	});

	return json({
		id: userId,
		accent_color: userData?.accent_color || 0,
		badges: userData?.crbt_badges.map((b) => ({ id: b, ...badges[b] })) || null,
		...(isSelf
			? {
					telemetry: userData?.telemetry ?? true,
					silent_joins: userData?.silent_joins ?? false,
					silent_leaves: userData?.silent_leaves ?? false
			  }
			: {})
	});
};
