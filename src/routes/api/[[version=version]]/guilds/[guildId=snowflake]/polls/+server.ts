import { errors, validateAccess } from '$lib/api';
import { prisma } from '$lib/prisma';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { formatError } from '$lib/api/genericErrors';
import { handlePagination } from '$lib/api/handlePagination';
import { PollStructure } from '$lib/api/structures/guild/poll';
import { generateSnowflake } from '$lib/snowflake';
import type { Poll } from '@prisma/client';
import { SnowflakeRegex } from '@purplet/utils';
import { fetchWithCache } from '$lib/cache';

export function _formatPoll(poll: Poll) {
	const isV2 = SnowflakeRegex.test(poll.id) && poll.title;
	const [channel_id, message_id] = isV2 ? poll.id.split('/') : [poll.channel_id, poll.message_id];

	return {
		id: poll.id,
		channel_id: channel_id,
		message_id: message_id,
		creator_id: poll.creator_id,
		guild_id: poll.guild_id,
		locale: poll.locale,
		end_date: poll.end_date,
		...(isV2
			? {
					title: poll.title,
					choices: poll.choices
			  }
			: {
					choice_count: poll.choices.length,
					participants: poll.choices
			  })
	};
}

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

	return json(polls.map(_formatPoll));
};

export const POST: RequestHandler = async ({ request, params }) => {
	let { errorMessage, tokenData } = await validateAccess(
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

		const newId = generateSnowflake().toString();
		const serverData = await fetchWithCache(
			`poll:${newId}`,
			() =>
				prisma.poll.create({
					data: {
						id: newId,
						channel_id: parsedData.channel_id,
						message_id: parsedData.message_id,
						title: parsedData.title,
						guild_id: params.guildId,
						choices: parsedData.choices.map((title) => ({
							title,
							participants: []
						})),
						creator_id: parsedData.creator_id === '@me' ? tokenData.userId : parsedData.creator_id,
						end_date: parsedData.end_date,
						locale: parsedData.locale
					}
				}),
			true
		);

		return json(serverData);
	} catch (e) {
		return formatError(e);
	}
};
