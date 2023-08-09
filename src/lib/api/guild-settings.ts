import { fetchWithCache } from '$lib/cache';
import { prisma } from '$lib/prisma';
import type {
	Economy,
	Item,
	Guild,
	Category,
	Prisma,
	serverModules,
	Achievement
} from '@prisma/client';

export type FullGuildSettings = Partial<
	Guild & {
		modules?: Partial<serverModules>;
		achievements?: Partial<Achievement[]>;
		economy?: Partial<
			Economy & {
				items: Item[];
				categories: (Category & {
					items: Item[];
				})[];
			}
		>;
	}
>;

export const prismaGuildInclude = {
	modules: true,
	achievements: true,
	economy: {
		include: {
			items: true,
			categories: {
				include: {
					items: true
				}
			}
		}
	}
};

export async function getGuildSettings(
	guildId: string,
	force = false,
	select?: Prisma.GuildSelect
) {
	const settings = await fetchWithCache<FullGuildSettings>(
		`settings:${guildId}`,
		() =>
			prisma.guild.findFirst({
				where: { id: guildId },
				include: prismaGuildInclude
			}),
		force
	);

	if (select) {
		return Object.entries(settings).reduce(
			(acc, [key, value]) => ({
				...acc,
				...(select[key] ? { [key]: value } : {})
			}),
			{} as FullGuildSettings
		);
	}

	return settings;
}
