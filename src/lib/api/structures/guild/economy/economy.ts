import { z } from 'zod';
import { EmojiStructure, SnowflakeStructure } from '../../misc';

export const EconomyStructure = z
	.object({
		currency_name_singular: z.string().min(2).max(30),
		currency_name_plural: z.string().min(2).max(35),
		currency_symbol: EmojiStructure,
		transaction_logs_channel_id: SnowflakeStructure.optional()
		// work_cooldown: z.number().min(1000 * 60).max(1000 * 60 * 60 * 24 * 365),
		// work_reward: z.string(),
		// daily_reward: z.string(),
		// weekly_reward: z.string().array(),
	})
	.strict();
