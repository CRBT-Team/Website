import { z } from 'zod';
import { PreprocessedDateStructure, SnowflakeStructure } from './misc';
import { ModerationStrikeTypes } from '@prisma/client';

export const ModerationEntryStructure = z
	.object({
		moderator_id: SnowflakeStructure,
		target_id: SnowflakeStructure,
		reason: z.string().max(256).optional(),
		expires_at: PreprocessedDateStructure.optional(),
		type: z.nativeEnum(ModerationStrikeTypes)
		//TODO: add "details" field
		// details: z.string().optional()
	})
	.strict();
