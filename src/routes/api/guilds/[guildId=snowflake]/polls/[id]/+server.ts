import { validateAccess } from '$lib/api';
import { prisma } from '$lib/prisma';
import type { RequestHandler } from './$types';
import { formatError } from '$lib/api/genericErrors';
import { json } from '@sveltejs/kit';
import { _formatPoll } from '../+server';
import { cache, fetchWithCache } from '$lib/cache';
import { PollStructure, type Poll } from '$lib/api/structures/guild/poll';

export const GET: RequestHandler = async ({ request, params }) => {
	let { errorMessage } = await validateAccess(request);
	if (errorMessage) return errorMessage;

	try {
		params.id = params.id.replace(/_/g, '/');

		const poll = await fetchWithCache(`poll:${params.id}`, () =>
			prisma.poll.findFirst({
				where: { id: params.id }
			})
		);

		if (!poll) {
			return formatError('Poll not found.', 404);
		}

		return json(_formatPoll(poll));
	} catch (e) {
		return formatError(e);
	}
};

export const PATCH: RequestHandler = async ({ request, params }) => {
	let { errorMessage } = await validateAccess(request);
	if (errorMessage) return errorMessage;

	try {
		params.id = params.id.replace(/_/g, '/');

		const poll = (await fetchWithCache(`poll:${params.id}`, () =>
			prisma.poll.findFirst({
				where: { id: params.id }
			})
		)) as any as Poll;

		if (!poll) {
			return formatError('Poll not found.', 404);
		}

		const body = await request.json();

		const parsedData = PollStructure.pick({
			choices: true,
			end_date: true,
			title: true,
			locale: true
		})
			.partial()
			.parse(body);

		const newData = await fetchWithCache(
			`poll:${poll.id}`,
			() =>
				prisma.poll.update({
					where: { id: poll.id },
					data: {
						choices: poll.choices.map((entry, i) => ({
							...entry,
							title: parsedData?.choices?.[i] || entry.title
						})),
						end_date: parsedData?.end_date || poll.end_date,
						title: parsedData?.title || poll.title,
						locale: parsedData?.locale || poll.locale
					}
				}),
			true
		);

		return json(_formatPoll(newData));
	} catch (e) {
		return formatError(e);
	}
};

export const DELETE: RequestHandler = async ({ request, params }) => {
	let { errorMessage } = await validateAccess(request);
	if (errorMessage) return errorMessage;

	try {
		params.id = params.id.replace(/_/g, '/');

		await prisma.poll.delete({
			where: { id: params.id }
		});
		cache.del(`poll:${params.id}`);

		return new Response(undefined, { status: 204 });
	} catch (e) {
		return formatError(e);
	}
};
