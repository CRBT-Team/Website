import { z } from 'zod';
import { EmojiStructure } from '../../misc';

export const CategoryStructure = z
	.object({
		label: z.string().max(100),
		emoji: EmojiStructure
	})
	.strict();
