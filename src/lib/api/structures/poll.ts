import { z } from 'zod';
import { PreprocessedDateStructure, SnowflakeStructure } from './misc';

export const PollStructure = z
	.object({
		channelId: SnowflakeStructure,
		messageId: SnowflakeStructure,
		creatorId: SnowflakeStructure,
		choices: z.never().array().array(),
		locale: z.string().default('en-US'),
		expiresAt: PreprocessedDateStructure
	})
	.strict()
	.required();
