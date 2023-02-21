import { validateAccess } from '$lib/api';
import { prisma } from '$lib/prisma';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { formatError } from '$lib/api/genericErrors';

export const GET: RequestHandler = async ({ request, params, url }) => {
	let { isAuthorized, error } = await validateAccess(
		request,
		{ guildId: params.guildId },
		{ guild: true }
	);

	if (!isAuthorized) return error;

	const limit = url.searchParams.get('limit') || '10';
	const page = url.searchParams.get('page') || '0';

	if (isNaN(Number(limit))) {
		return formatError("Expected number on property 'limit'", 401);
	}

	if (isNaN(Number(page))) {
		return formatError("Expected number on property 'page'", 401);
	}

	const reminders = await prisma.poll.findMany({
		where: { serverId: params.guildId },
		...(limit ? { take: Number(limit) } : {}),
		...(page ? { skip: Number(limit) * Number(page) } : {}),
		select: {
			id: true,
			serverId: true,
			choices: true,
			creatorId: true,
			locale: true,
			expiresAt: true
		}
	});

	return json(
		reminders.map((r) => {
			const [channelId, messageId] = r.id.split('/');
			return {
				id: r.id,
				channelId,
				messageId,
				creatorId: r.creatorId,
				guildId: r.serverId,
				locale: r.locale,
				expiresAt: r.expiresAt,
				choiceCount: r.choices.length,
				participants: r.choices
			};
		})
	);
};

// export const POST: RequestHandler = async ({ request, params }) => {
// 	let { isAuthorized, error } = await validateAccess(
// 		request,
// 		{ guildId: params.guildId },
// 		{ guild: true }
// 	);

// 	if (!isAuthorized) return error;

// 	const polls = await prisma.poll.findMany({ where: { serverId: params.guildId } });
// 	const maxPolls = 10;

// 	if (polls.length >= maxPolls) {
// 		return formatError(`Maximum amount of ${maxPolls} reminders reached for this guild.`);
// 	}

// 	const poll = z
// 		.object({
// 			channelId: SnowflakeStructure,
// 			messageId: SnowflakeStructure,
// 			creatorId: SnowflakeStructure,
// 			choices: z.never().array().array(),
//       locale: z.string().default('en-US'),
//       expiresAt: z.preprocess((arg) => {
// 				if (typeof arg == 'string') return new Date(arg);
// 			}, z.date()),

// 		})
// 		.strict()
// 		.required();

// 	type Poll = z.infer<typeof poll>;
// };
