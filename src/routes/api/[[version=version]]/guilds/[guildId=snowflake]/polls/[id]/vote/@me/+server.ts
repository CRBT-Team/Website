import { validateAccess } from '$lib/api';
import { fetchWithCache } from '$lib/cache';
import { prisma } from '$lib/prisma';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { formatError } from '$lib/api/genericErrors';
import type { Poll } from '$lib/api/structures/guild/poll';
import { z } from 'zod';

export const PUT: RequestHandler = async ({ request, params }) => {
	let { errorMessage, tokenData } = await validateAccess(
		request,
		{ guildId: params.guildId },
		{ guild: true }
	);
	if (errorMessage) return errorMessage;

	params.id = params.id.replace(/_/g, '/');

	const poll = (await fetchWithCache(`poll:${params.id}`, () =>
		prisma.poll.findFirst({
			where: { id: params.id }
		})
	)) as any as Poll;

	if (!poll) {
		return formatError('Poll not found.', 404);
	}

	const body = await request.text();

	try {
		const newChoiceIndex = z
			.number()
			.min(0)
			.max(poll.choices.length - 1, {
				message: 'Invalid choice index.'
			})
			.parse(parseInt(body));

		const currentVoteIndex = poll.choices.findIndex((c) =>
			c.participants.find((p) => p === tokenData.userId)
		);

		if (currentVoteIndex === newChoiceIndex) {
			return formatError('Can not vote for the same choice.', 400);
		}

		poll.choices[newChoiceIndex].participants.push(tokenData.userId);
		poll.choices[currentVoteIndex].participants = poll.choices[
			currentVoteIndex
		].participants.filter((v) => v !== tokenData.userId);

		const newPoll = await fetchWithCache(
			`poll:${params.id}`,
			() =>
				prisma.poll.update({
					where: { id: params.id },
					data: {
						choices: poll.choices
					}
				}),
			true
		);

		return json(newPoll);
	} catch (e) {
		return formatError(e);
	}
};

export const DELETE: RequestHandler = async ({ request, params }) => {
	let { errorMessage, tokenData } = await validateAccess(
		request,
		{ guildId: params.guildId },
		{ guild: true }
	);
	if (errorMessage) return errorMessage;

	params.id = params.id.replace(/_/g, '/');

	const poll = (await fetchWithCache(`poll:${params.id}`, () =>
		prisma.poll.findFirst({
			where: { id: params.id }
		})
	)) as any as Poll;

	if (!poll) {
		return formatError('Poll not found.', 404);
	}

	try {
		const currentVoteIndex = poll.choices.findIndex((c) =>
			c.participants.find((p) => p === tokenData.userId)
		);

		poll.choices[currentVoteIndex].participants = poll.choices[
			currentVoteIndex
		].participants.filter((v) => v !== tokenData.userId);

		const newPoll = await fetchWithCache(
			`poll:${params.id}`,
			() =>
				prisma.poll.update({
					where: { id: params.id },
					data: {
						choices: poll.choices
					}
				}),
			true
		);

		return json(newPoll);
	} catch (e) {
		return formatError(e);
	}
};
