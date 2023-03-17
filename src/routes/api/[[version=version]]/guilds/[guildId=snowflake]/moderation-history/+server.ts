import { validateAccess } from '$lib/api';
import { handlePagination } from '$lib/api/handlePagination';
import { prisma } from '$lib/prisma';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { ModerationStrikeTypes } from '@prisma/client';
import { formatError, badRequest } from '$lib/api/genericErrors';
import { ModerationEntryStructure } from '$lib/api/structures/moderation-entry';

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
		user_id: url.searchParams.get('user_id'),
		type: url.searchParams.get('type') as ModerationStrikeTypes
	};

	const history = await prisma.moderationStrikes.findMany({
		where: {
			guild_id: params.guildId,
			...(filters.type ? { type: filters.type } : {}),
			...(filters.user_id ? { targetId: filters.user_id } : {})
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

export const POST: RequestHandler = async ({ request, params, url }) => {
	let { errorMessage } = await validateAccess(
		request,
		{ guildId: params.guildId },
		{ guild: true }
	);
	if (errorMessage) return errorMessage;

	const body = await request.json();

	if (!body) return badRequest();

	try {
		const parsedData = ModerationEntryStructure.parse(body);

		const serverData = await prisma.moderationStrikes.create({
			data: {
				//TODO: add details
				end_date: parsedData.end_date,
				type: parsedData.type,
				moderator_id: parsedData.moderator_id,
				target_id: parsedData.target_id,
				reason: parsedData.reason,
				guild_id: params.guildId,
				created_at: new Date()
			}
		});

		return json(serverData);
	} catch (e) {
		return formatError(e);
	}
};
