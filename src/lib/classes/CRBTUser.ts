import type { APIProfile } from '$lib/util/types/APIProfile';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import type { APIUser } from 'discord-api-types/v10';
import { Badge, Banner } from './Item';

export class CRBTUser {
	public id: string;
	public profile: {
		name?: string;
		verified: boolean;
		bio?: string;
		purplets: number;
		badges?: Badge[];
		banner?: Banner;
		accent_color?: `#${string}` | 'profile';
		url?: string;
		location?: string;
		pronouns?: string;
		likes?: CRBTUser[];
		birthday?: Dayjs;
	};
	discord: APIUser;

	constructor(discordUser: APIUser, profile?: APIProfile) {
		this.profile = {
			name: profile.name,
			purplets: profile.purplets,
			verified: profile.verified,
			bio: profile.bio,
			badges: profile.crbt_badges.length > 0 ? profile.crbt_badges.map((b) => new Badge(b)) : null,
			banner: profile.crbt_banner ? new Banner(profile.crbt_banner) : null,
			accent_color: profile.crbt_accent_color,
			url: profile.url,
			location: profile.location,
			pronouns: profile.pronouns,
			birthday: dayjs(profile.birthday)
		};
		this.discord = discordUser;
	}
}
