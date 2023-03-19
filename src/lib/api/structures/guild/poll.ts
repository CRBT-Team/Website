import { z } from 'zod';
import { PreprocessedDateStructure, SnowflakeStructure } from '../misc';

export const PollStructure = z
	.object({
		channel_id: SnowflakeStructure,
		message_id: SnowflakeStructure,
		creator_id: SnowflakeStructure.or(z.literal('@me')),
		title: z.string().min(2).max(120),
		choices: z.array(z.string().min(1).max(45)).min(1).max(4),
		locale: z.string().default('en-US'),
		end_date: PreprocessedDateStructure
	})
	.strict()
	.required();
