import { validateAccess } from '$lib/api';
import { prisma } from '$lib/prisma';
import type { RequestHandler } from './$types';
import { formatError } from '$lib/api/genericErrors';
import { json } from '@sveltejs/kit';
import { cache, fetchWithCache } from '$lib/cache';

export const GET: RequestHandler = async ({ request, params }) => {
	let { errorMessage, tokenData } = await validateAccess(
		request,
		{ userId: params.userId },
		{ user: true }
	);
	if (errorMessage) return errorMessage;

	try {
		params.reminderId = params.reminderId.replace(/_/g, '/');

		const reminder = await fetchWithCache(`reminder:${params.reminderId}`, () =>
			prisma.reminder.findFirst({
				where: { id: params.reminderId }
			})
		);

		if (!reminder) {
			return formatError('Reminder not found.', 404);
		}

		return json(reminder);
	} catch (e) {
		return formatError(e);
	}
};
