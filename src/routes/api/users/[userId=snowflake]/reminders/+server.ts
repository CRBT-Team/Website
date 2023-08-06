import { prisma } from '$lib/prisma';
import { validateAccess } from '$lib/api';
import type { RequestHandler } from '../$types';
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params, request }) => {
	let { errorMessage } = await validateAccess(request);

	if (errorMessage) return errorMessage;

	const userData = await prisma.reminder.findMany({
		where: { user_id: params.userId }
	});

	return json(userData);
};

// export const PUT: RequestHandler = async ({ request, params }) => {
// 	let { isAuthorized, error, tokenData } = await validateAccess(request);

// 	if (!isAuthorized) return error;

// 	const userId = params.userId === '@me' ? tokenData.userId : params.userId;

// 	const body = await request.json();

// 	const reminders = await prisma.reminder.findMany({ where: { userId } });
// 	const maxReminders = 10;

// 	if (reminders.length >= maxReminders) {
// 		return formatError(`Maximum amount of ${maxReminders} reminders reached for this user.`);
// 	}

// 	try {
// 		const data = ReminderStructure.parse({
// 			...body,
// 			userId
// 		});

// 		const result = await prisma.reminder.create({
// 			data: {
// 				id: `${data.guildId}/${data.channelId}/${data.messageId}`,
// 				destination: data.destination,
// 				expiresAt: data.expiresAt,
// 				locale: data.locale,
// 				subject: data.subject,
// 				type: data.type,
// 				user: {
// 					connectOrCreate: {
// 						create: { id: userId },
// 						where: { id: userId }
// 					}
// 				}
// 			}
// 		});

// 		return json(result);
// 	} catch (e) {
// 		return formatError(e);
// 	}
// };
