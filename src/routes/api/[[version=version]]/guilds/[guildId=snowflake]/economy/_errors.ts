import { formatError } from '$lib/api/genericErrors';

export const economyNotSetupError = (guildId: string) =>
	formatError(`Economy not found for Guild ${guildId}`, 404);
