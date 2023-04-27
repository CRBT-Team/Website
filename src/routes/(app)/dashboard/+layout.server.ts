import { botRest } from '$lib/auth/botRest';
import { getClientRest } from '$lib/auth/clientRest';
import {
	PermissionFlagsBits,
	type APIUser,
	type RESTGetAPICurrentUserGuildsResult
} from 'discord-api-types/v10';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (e) => {
	const { locals } = e;

	const rest = await getClientRest(e);

	// @ts-ignore
	const botGuilds: RESTGetAPICurrentUserGuildsResult = await botRest.user.getCurrentUserGuilds();

	// @ts-ignore
	const user: APIUser = locals?.user || (await rest.user.getCurrentUser());

	const guilds: RESTGetAPICurrentUserGuildsResult =
		locals?.guilds ||
		// @ts-ignore
		(await rest.user.getCurrentUserGuilds()).filter(
			(guild) =>
				(BigInt(guild.permissions) & PermissionFlagsBits.ManageGuild) ===
					PermissionFlagsBits.ManageGuild && botGuilds.find((g) => g.id === guild.id)
		);

	console.log(Object.keys(locals));

	e.locals = { ...locals, rest, user, guilds };

	return {
		user,
		guilds: guilds.sort((a, b) => a.name.localeCompare(b.name))
	};
};
