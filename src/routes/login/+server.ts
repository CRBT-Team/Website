import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	console.log(url);

	const d = new URLSearchParams({
		client_id: '595731552709771264',
		redirect_uri: `http://${url.host}/api/handle-login`,
		response_type: 'code',
		scope: 'identify guilds'
	});

	const useGuild = url.searchParams.get('guild');
	if (useGuild) {
		d.append('guild_id', useGuild);
		d.append('disable_guild_select', 'true');
	}
	return Response.redirect(`https://discord.com/api/oauth2/authorize?${d}`, 301);
};
