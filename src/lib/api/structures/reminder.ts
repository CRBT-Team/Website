import { ReminderTypes } from '@prisma/client';
import { SnowflakeStructure, PreprocessedDateStructure } from './misc';
import { z } from 'zod';

export const ReminderStructure = z
	.object({
		user_id: SnowflakeStructure,
		guild_id: z.union([z.literal('@me'), SnowflakeStructure]),
		channel_id: SnowflakeStructure,
		// messageId: SnowflakeStructure,
		//TODO: add "details" field
		expires_at: PreprocessedDateStructure,
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
