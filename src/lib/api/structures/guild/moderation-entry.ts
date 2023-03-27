import { z } from 'zod';
import { PreprocessedDateStructure, SnowflakeStructure } from '../misc';

export enum ModerationEntryType {
	Ban,
	TempBan,
	Clear,
	Kick,
	Timeout,
	Warn,
	Report
}

export const ModerationEntryStructure = z
	.object({
		user_id: SnowflakeStructure,
		target_id: SnowflakeStructure,
		reason: z.string().max(256).optional(),
		end_date: PreprocessedDateStructure.optional(),
		type: z.nativeEnum(ModerationEntryType)
		//TODO: add "details" field
		// details: z.string().optional()
	})
	.strict();
