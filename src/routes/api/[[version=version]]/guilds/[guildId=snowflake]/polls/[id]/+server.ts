import { validateAccess } from '$lib/api';
import { prisma } from '$lib/prisma';
import type { RequestHandler } from './$types';
import { formatError } from '$lib/api/genericErrors';

export const DELETE: RequestHandler = async ({ request, params }) => {
	let { errorMessage } = await validateAccess(
		request,
		{ guildId: params.guildId },
		{ guild: true }
	);
	if (errorMessage) return errorMessage;

	try {
		params.id = params.id.replace(/_/g, '/');

		await prisma.poll.delete({
			where: { id: params.id }
		});

		return new Response(undefined, { status: 204 });
	} catch (e) {
		return formatError(e);
	}
};
