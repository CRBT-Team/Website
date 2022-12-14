import { botRest } from '$lib/auth/botRest';
import { db } from '$lib/prisma';
import type { RawServerJoin } from '$lib/types/messageBuilder';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const dbData = await db.servers.findFirst({
    where: { id: params.id },
    select: {
      joinChannel: true,
      joinMessage: true,
      modules: true
    }
  }) as RawServerJoin;

  const channels = await botRest.guild.getGuildChannels({
    guildId: params.id
  });

  return {
    channels,
    ...dbData
  };
};