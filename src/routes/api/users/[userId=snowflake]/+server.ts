import { prisma } from '$lib/prisma';
import { json, type RequestHandler } from '@sveltejs/kit';
import badges from '$lib/util/badges';
import { validateAccess } from '$lib/api';

export const GET: RequestHandler = async ({ params, request }) => {
	let { errorMessage } = await validateAccess(request);

	if (errorMessage) return errorMessage;

	const userData = await prisma.user.findFirst({
		where: { id: params.userId },
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
		id: params.userId,
		accent_color: userData?.accent_color || 0,
		badges: userData?.crbt_badges.map((b) => ({ id: b, ...badges[b] })) || null,
		telemetry: userData?.telemetry ?? true,
		silent_joins: userData?.silent_joins ?? false,
		silent_leaves: userData?.silent_leaves ?? false
	});
};
