import { validateAccess } from '$lib/api';
import { handlePagination } from '$lib/api/handlePagination';
import { prisma } from '$lib/prisma';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { ModerationStrikeTypes } from '@prisma/client';

export const GET: RequestHandler = async ({ request, params, url }) => {
	let { errorMessage } = await validateAccess(
		request,
		{ guildId: params.guildId },
		{ guild: true }
	);

	if (errorMessage) return errorMessage;

	const { paginationError, limit, page } = handlePagination(url);

	if (paginationError) return paginationError;

	const filters = {
		userId: url.searchParams.get('userId'),
		type: url.searchParams.get('type') as ModerationStrikeTypes
	};

	const history = await prisma.moderationStrikes.findMany({
		where: {
			serverId: params.guildId,
			...(filters.type ? { type: filters.type } : {}),
			...(filters.userId ? { targetId: filters.userId } : {})
		},
		...(limit ? { take: Number(limit) } : {}),
		...(page ? { skip: Number(limit) * Number(page) } : {})
	});

	return json({
		count: history.length,
		items: history.map((modCase) => {
			return {
				...modCase,
				details: JSON.parse(modCase.details)
			};
		})
	});
};
