import { ReminderTypes } from '@prisma/client';
import { SnowflakeStructure, PreprocessedDateStructure } from './misc';
import { z } from 'zod';

export const ReminderStructure = z
	.object({
		userId: SnowflakeStructure,
		guildId: z.union([z.literal('@me'), SnowflakeStructure]),
		channelId: SnowflakeStructure,
		// messageId: SnowflakeStructure,
		expiresAt: PreprocessedDateStructure,
		destination: z
			.union([z.literal('dm'), SnowflakeStructure], {
				invalid_type_error: "You need to input a valid channel ID or 'dm' to send it by DM."
			})
			.default('dm'),
		locale: z.string().default('en-US'),
		subject: z.string(),
		type: z.nativeEnum(ReminderTypes)
	})
	.strict()
	.required();
