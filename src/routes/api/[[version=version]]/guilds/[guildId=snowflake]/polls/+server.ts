import { errors, validateAccess } from '$lib/api';
import { prisma } from '$lib/prisma';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { formatError } from '$lib/api/genericErrors';
import { handlePagination } from '$lib/api/handlePagination';
import { PollStructure } from '$lib/api/structures/poll';

export const GET: RequestHandler = async ({ request, params, url }) => {
	let { errorMessage } = await validateAccess(
		request,
		{ guildId: params.guildId },
		{ guild: true }
	);

	if (errorMessage) return errorMessage;

	const { paginationError, limit, page } = handlePagination(url);

	if (paginationError) return paginationError;

	const polls = await prisma.poll.findMany({
		where: { guild_id: params.guildId },
		...(limit ? { take: Number(limit) } : {}),
		...(page ? { skip: Number(limit) * Number(page) } : {})
	});

	return json(
		polls.map((poll) => {
			const [channel_id, message_id] = poll.id.split('/');
			return {
				id: poll.id,
				channel_id: channel_id,
				message_id: message_id,
				creator_id: poll.creator_id,
				guild_id: poll.guild_id,
				locale: poll.locale,
				end_date: poll.end_date,
				choice_count: poll.choices.length,
				participants: poll.choices
			};
		})
	);
};

export const POST: RequestHandler = async ({ request, params }) => {
	let { errorMessage } = await validateAccess(
		request,
		{ guildId: params.guildId },
		{ guild: true }
	);

	if (errorMessage) return errorMessage;

	const body = await request.json();

	if (!body) return errors.badRequest();

	try {
		const parsedData = PollStructure.parse(body);

		const polls = await prisma.poll.findMany({ where: { guild_id: params.guildId } });
		const maxPolls = 10;

		if (polls.length >= maxPolls) {
			return formatError(`Maximum amount of ${maxPolls} reminders reached for this guild.`);
		}

		const serverData = await prisma.poll.create({
			data: {
				id: `${parsedData.channel_id}/${parsedData.message_id}`,
				guild_id: params.guildId,
				choices: parsedData.choices,
				creator_id: parsedData.creator_id,
				end_date: parsedData.end_date,
				locale: parsedData.locale
			}
		});

		return json(serverData);
	} catch (e) {
		return formatError(e);
	}
};
