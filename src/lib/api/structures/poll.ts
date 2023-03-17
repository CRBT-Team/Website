import { z } from 'zod';
import { PreprocessedDateStructure, SnowflakeStructure } from './misc';

export const PollStructure = z
	.object({
		channel_id: SnowflakeStructure,
		message_id: SnowflakeStructure,
		creator_id: SnowflakeStructure,
		choices: z.never().array().array(),
		locale: z.string().default('en-US'),
		end_date: PreprocessedDateStructure
	})
	.strict()
	.required();
