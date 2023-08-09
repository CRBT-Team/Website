import { z } from 'zod';
import { EmojiStructure, PreprocessedDateStructure, SnowflakeStructure } from '../../misc';
import { RewardTypes } from '@prisma/client';
import { SnowflakeRegex } from '@purplet/utils';

export enum AchievementType {
	Manual
}

export enum AchievementRequirementType {
	Channel,
	Words,
	Role,
	Command
}

export const AchievementRequirementStructure = z
	.object({
		type: z.nativeEnum(AchievementRequirementType),
		value: z.string()
	})
	.refine(({ type, value }) => {
		if (
			type === AchievementRequirementType.Channel ||
			type === AchievementRequirementType.Role ||
			type === AchievementRequirementType.Command ||
			SnowflakeRegex.test(value)
		) {
			return '"value" needs to be a Snowflake for Channel, Role or Command types.';
		}
		return true;
	});

export const AchievementStructure = z
	.object({
		name: z.string().max(256),
		description: z.string().max(1024).optional(),
		icon: EmojiStructure.optional(),
		rewards: z.nativeEnum(RewardTypes).array().max(2).optional(),
		money: z.number().int().min(0).max(Number.MAX_SAFE_INTEGER).optional(),
		role_id: SnowflakeStructure.optional(),
		type: z.nativeEnum(AchievementType),
		total_steps: z.number(),
		requirements: AchievementRequirementStructure.array().optional(),
		available_until: PreprocessedDateStructure.optional()
	})
	.strict()
	.refine(
		({ rewards, money }) => (rewards.includes('MONEY') ? rewards.includes('MONEY') && money : true),
		'The "money" field should not be empty if "rewards" include "MONEY".'
	)
	.refine(
		({ rewards, role_id }) =>
			rewards.includes('ROLE') ? rewards.includes('ROLE') && role_id : true,
		'The "role_id" field should not be empty if "rewards" include "ROLE".'
	);
