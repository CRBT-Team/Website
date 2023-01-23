import { botRest } from '$lib/auth/botRest';
import { prisma } from '$lib/prisma';
import type { RawServerJoin } from '$lib/types/messageBuilder';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const dbData = (await prisma.servers.findFirst({
		where: { id: params.id },
		select: {
			joinChannel: true,
			joinMessage: true,
			modules: true
		}
	})) as RawServerJoin;

	const channels = await botRest.guild.getGuildChannels({
		guildId: params.id
	} as any);

	return {
		channels,
		...dbData
	};
};
