import { z } from 'zod';
import { EmojiStructure, PreprocessedDateStructure } from '../../misc';

export enum ItemType {
	Other,
	Role,
	IncomeMultiplier,
	Cosmetic,
	Weapon
}

export const AcceptedIncomeMultiplierValueRegex = /x[0-9]{1,2}(\.[0-9]{1,2})?/;

export const ItemStructure = z
	.object({
		name: z.string().min(1).max(50),
		emoji: EmojiStructure,
		description: z.string().min(1).max(1024).optional(),
		price: z.number().int().min(0).max(Number.MAX_SAFE_INTEGER),
		type: z.nativeEnum(ItemType),
		stock: z.number().min(0).max(200_000).optional(),
		available_until: PreprocessedDateStructure.optional(),
		value: z.string().nullable()
	})
	.strict();
