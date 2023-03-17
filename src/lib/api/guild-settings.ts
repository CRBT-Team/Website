import { fetchWithCache } from '$lib/cache';
import { prisma } from '$lib/prisma';
import type {
	Economy,
	EconomyItem,
	EconomyItemCategory,
	Prisma,
	serverModules,
	servers
} from '@prisma/client';

export type FullGuildSettings = Partial<
	servers & {
		modules?: Partial<serverModules>;
		economy?: Partial<
			Economy & {
				items: EconomyItem[];
				categories: (EconomyItemCategory & {
					items: EconomyItem[];
				})[];
			}
		>;
	}
>;

export const prismaGuildInclude = {
	modules: true,
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
	select?: Prisma.serversSelect
) {
	const settings = await fetchWithCache<FullGuildSettings>(
		`settings:${guildId}`,
		() =>
			prisma.servers.findFirst({
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
