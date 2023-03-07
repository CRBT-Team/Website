import { z } from 'zod';
import { PreprocessedDateStructure, SnowflakeStructure } from './misc';
import { ModerationStrikeTypes } from '@prisma/client';

export const ModerationEntryStructure = z
	.object({
		moderatorId: SnowflakeStructure,
		targetId: SnowflakeStructure,
		reason: z.string().max(256).optional(),
		expiresAt: PreprocessedDateStructure.optional(),
		type: z.nativeEnum(ModerationStrikeTypes)
		//TODO: add "details" field
		// details: z.string().optional()
	})
	.strict();
