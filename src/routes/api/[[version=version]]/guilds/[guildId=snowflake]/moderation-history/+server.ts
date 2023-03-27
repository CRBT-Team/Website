import { validateAccess } from '$lib/api';
import { handlePagination } from '$lib/api/handlePagination';
import { prisma } from '$lib/prisma';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { formatError, badRequest } from '$lib/api/genericErrors';
import {
	ModerationEntryStructure,
	ModerationEntryType
} from '$lib/api/structures/guild/moderation-entry';
import { generateSnowflake } from '$lib/snowflake';

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
		target_id: url.searchParams.get('target_id'),
		type: url.searchParams.get('type') ? Number(url.searchParams.get('type')) : null
	};

	if (filters.type && (isNaN(filters.type) || !ModerationEntryType[filters.type])) {
		return formatError('Invalid filter type', 400);
	}

	const history = await prisma.moderationEntry.findMany({
		where: {
			guild_id: params.guildId,
			...(filters.type ? { type: filters.type } : {}),
			...(filters.target_id ? { target_id: filters.target_id } : {})
		},
		...(limit ? { take: Number(limit) } : {}),
		...(page ? { skip: Number(limit) * Number(page) } : {})
	});

	return json({
		count: history.length,
		items: history.map((entry) => {
			return {
				...entry,
				details: JSON.parse(entry.details)
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

		const serverData = await prisma.moderationEntry.create({
			data: {
				//TODO: add details
				id: generateSnowflake().toString(),
				end_date: parsedData.end_date,
				type: parsedData.type,
				user_id: parsedData.user_id,
				target_id: parsedData.target_id,
				reason: parsedData.reason,
				guild_id: params.guildId
			}
		});

		return json(serverData);
	} catch (e) {
		return formatError(e);
	}
};
