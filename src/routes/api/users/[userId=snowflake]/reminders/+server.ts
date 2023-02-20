import { prisma } from '$lib/prisma';
import { validateAccess } from '$lib/api';
import type { RequestHandler } from '../$types';
import { json } from '@sveltejs/kit';
import { z, ZodError } from 'zod';
import { SnowflakeRegex } from '@purplet/utils';
import { ReminderTypes } from '@prisma/client';
import { formatError } from '$lib/api/genericErrors';

export const GET: RequestHandler = async ({ params, request }) => {
	let { isAuthorized, error, tokenData } = await validateAccess(
		request,
		{ userId: params.userId },
		{ user: true }
	);

	if (!isAuthorized) return error;

	const userId = params.userId === '@me' ? tokenData.userId : params.userId;

	const userData = await prisma.reminder.findMany({
		where: { userId }
	});

	return json(userData);
};

export const PUT: RequestHandler = async ({ request, params }) => {
	let { isAuthorized, error, tokenData } = await validateAccess(
		request,
		{ userId: params.userId },
		{ user: true }
	);

	if (!isAuthorized) return error;

	const userId = params.userId === '@me' ? tokenData.userId : params.userId;

	const body = await request.json();

	const reminders = await prisma.reminder.findMany({ where: { userId } });
	const maxReminders = 10;

	if (reminders.length >= maxReminders) {
		return formatError(`Maximum amount of ${maxReminders} reminders reached for this user.`);
	}

	const reminder = z
		.object({
			userId: z.string().regex(SnowflakeRegex),
			guildId: z.union([z.literal('@me'), z.string().regex(SnowflakeRegex)]),
			channelId: z.string().regex(SnowflakeRegex),
			messageId: z.string().regex(SnowflakeRegex),
			expiresAt: z.preprocess((arg) => {
				if (typeof arg == 'string') return new Date(arg);
			}, z.date()),
			destination: z
				.union([z.literal('dm'), z.string().regex(SnowflakeRegex)], {
					invalid_type_error: "You need to input a valid channel ID or 'dm' to send it by DM."
				})
				.default('dm'),
			locale: z.string().default('en-US'),
			subject: z.string(),
			type: z.nativeEnum(ReminderTypes)
		})
		.required();

	try {
		const data = reminder.parse({
			...body,
			userId
		});

		const result = await prisma.reminder.create({
			data: {
				id: `${data.guildId}/${data.channelId}/${data.messageId}`,
				destination: data.destination,
				expiresAt: data.expiresAt,
				locale: data.locale,
				subject: data.subject,
				type: data.type,
				user: {
					connectOrCreate: {
						create: { id: userId },
						where: { id: userId }
					}
				}
			}
		});

		return json(result);
	} catch (e) {
		if (e instanceof ZodError) {
			return formatError(e);
		} else return formatError(String(e).replaceAll('\n', ''));
	}
};
