import { z } from 'zod';
import { PreprocessedDateStructure, SnowflakeStructure } from '../misc';

export interface Poll {
	guild_id: string;
	channel_id: string;
	message_id: string;
	creator_id: string;
	title: string;
	choices: {
		title: string;
		participants: string[];
	}[];
	end_date: Date;
	locale: string;
	id: string;
}

export const PollStructure = z
	.object({
		channel_id: SnowflakeStructure,
		message_id: SnowflakeStructure,
		creator_id: SnowflakeStructure.or(z.literal('@me')),
		title: z.string().min(2).max(120),
		choices: z.array(z.string().min(1).max(45)).min(2).max(4),
		locale: z.string().default('en-US'),
		end_date: PreprocessedDateStructure
	})
	.strict()
	.required();
