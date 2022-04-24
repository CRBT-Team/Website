import { CRBTUser } from '$lib/classes/CRBTUser';
import { db } from '$lib/db';
import type { APIProfile } from '$lib/util/types/APIProfile';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ params }) => {
	const discord = await fetch(`https://discord.com/api/users/${params.id}`, {
		headers: {
			Authorization: `Bot ${process.env.DISCORD_TOKEN}`
		}
	});

	if (!discord.ok) {
		return {
			status: 404,
			body: JSON.stringify({
				error: 'Profile not found'
			})
		};
	}
	const duser = await discord.json();
	const profile = (await db.profiles.findFirst({ where: { id: params.id } })) as APIProfile;

	return {
		status: 200,
		body: JSON.stringify(new CRBTUser(duser, profile))
	};
};
