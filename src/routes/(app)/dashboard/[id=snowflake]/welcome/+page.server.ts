import { CRBT_TOKEN } from '$env/static/private';
import { botRest } from '$lib/auth/botRest';
import type { RawServerJoin } from '$lib/types/messageBuilder';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, fetch }) => {
	const dbData = (await fetch(`/api/guilds/${params.id}/join-message`, {
		headers: {
			Authorization: CRBT_TOKEN
		}
	})) as RawServerJoin;

	console.log(dbData);

	const channels = await botRest.guild.getGuildChannels({
		guildId: params.id
	} as any);

	return {
		channels,
		...dbData
	};
};
