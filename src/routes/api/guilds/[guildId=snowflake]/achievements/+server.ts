import { validateAccess } from '$lib/api';
import { badRequest, formatError } from '$lib/api/genericErrors';
import { getGuildSettings } from '$lib/api/guild-settings';
import { AchievementStructure } from '$lib/api/structures/guild/achievement/achievement';
import { prisma } from '$lib/prisma';
import { generateSnowflake } from '$lib/snowflake';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { handlePagination } from '$lib/api/handlePagination';

export const GET: RequestHandler = async ({ request, params, url }) => {
	let { errorMessage } = await validateAccess(request);

	if (errorMessage) return errorMessage;

	const { paginationError, limit, page } = handlePagination(url);

	if (paginationError) return paginationError;

	const achievements = await prisma.achievement.findMany({
		where: { guild_id: params.guildId },
		...(limit ? { take: Number(limit) } : {}),
		...(page ? { skip: Number(limit) * Number(page) } : {})
	});

	return json(achievements);
};

export const POST: RequestHandler = async ({ params, request }) => {
	let { errorMessage } = await validateAccess(request);

	if (errorMessage) return errorMessage;

	const body = await request.json();

	if (!body) return badRequest();

	try {
		const parsedData = AchievementStructure.parse(body);

		const newAchievement = await prisma.achievement.create({
			data: {
				id: generateSnowflake().toString(),
				guild_id: params.guildId,
				name: parsedData.name,
				description: parsedData.description,
				icon: parsedData.icon,
				rewards: parsedData.rewards,
				money: parsedData.money,
				role_id: parsedData.role_id,
				type: parsedData.type,
				total_steps: parsedData.total_steps,
				requirements: parsedData.requirements,
				available_until: parsedData.available_until
			}
		});

		await getGuildSettings(params.guildId, true);

		return json(newAchievement);
	} catch (e) {
		return formatError(e);
	}
};
