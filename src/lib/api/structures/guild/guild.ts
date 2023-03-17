import { z } from 'zod';
import { SnowflakeStructure } from '../misc';

export const GuildStructure = z
	.object({
		accent_color: z.number(),
		auto_theming_enabled: z.boolean(),
		join_channel_id: SnowflakeStructure,
		leave_channel_id: SnowflakeStructure,
		notifications_channel_id: SnowflakeStructure,
		reports_channel_id: SnowflakeStructure
		// TODO: rework modules handling
		// modules: z.object({
		// 	economy: z.boolean(),
		// 	join_message: z.boolean(),
		// 	leave_message: z.boolean(),
		// 	moderation_notifications: z.boolean(),
		// 	moderation_reports: z.boolean()
		// })
	})
	.deepPartial()
	.strict();
