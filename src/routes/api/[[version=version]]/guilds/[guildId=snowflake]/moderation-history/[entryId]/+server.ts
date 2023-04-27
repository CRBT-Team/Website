import { validateAccess } from '$lib/api';
import { formatError } from '$lib/api/genericErrors';
import { prisma } from '$lib/prisma';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import {
	ModerationEntryStructure,
	ModerationEntryType
} from '$lib/api/structures/guild/moderation-entry';

export const GET: RequestHandler = async ({ request, params }) => {
	let { errorMessage } = await validateAccess(
		request,
		{ guildId: params.guildId },
		{ guild: true }
	);

	if (errorMessage) return errorMessage;

	try {
		const entry = await prisma.moderationEntry.findFirst({
			where: { id: params.entryId }
		});

		if (!entry) {
			return formatError('Entry not found.', 404);
		}

		return json({
			...entry,
			details: JSON.parse(entry.details)
		});
	} catch (e) {
		return formatError(e);
	}
};

export const PATCH: RequestHandler = async ({ request, params }) => {
	let { errorMessage } = await validateAccess(
		request,
		{ guildId: params.guildId },
		{ guild: true }
	);
	if (errorMessage) return errorMessage;

	const body = await request.json();

	const oldData = await prisma.moderationEntry.findFirst({
		where: { id: params.entryId }
	});

	if (!oldData) {
		return formatError('Entry not found.', 404);
	}

	if (oldData.type === ModerationEntryType.Report) {
		return formatError(`Error of type ${oldData.type} is not editable.`, 400);
	}

	try {
		const data = ModerationEntryStructure.pick({ reason: true }).parse(body);

		const updatedData = await prisma.moderationEntry.update({
			where: { id: params.entryId },
			data: {
				reason: data.reason
			}
		});

		return json(updatedData);
	} catch (e) {
		return formatError(e);
	}
};

export const DELETE: RequestHandler = async ({ request, params }) => {
	let { errorMessage } = await validateAccess(
		request,
		{ guildId: params.guildId },
		{ guild: true }
	);
	if (errorMessage) return errorMessage;

	try {
		await prisma.moderationEntry.delete({
			where: { id: params.entryId }
		});

		return new Response(undefined, { status: 204 });
	} catch (e) {
		return formatError(e);
	}
};
