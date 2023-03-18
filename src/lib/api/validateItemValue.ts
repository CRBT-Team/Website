import type { Item } from '@prisma/client';
import { AcceptedIncomeMultiplierValueRegex, ItemType } from './structures/guild/economy/item';
import { ImageUrlRegex, SnowflakeRegex } from '@purplet/utils';
import { botRest } from '$lib/auth/botRest';
import { formatError } from './genericErrors';

export async function validateItemValue(item: Partial<Item>, guildId: string) {
	if (item.type !== ItemType.Other && !item.value) {
		return formatError(`Item must have a non-null value.`, 400);
	}

	if (item.type === ItemType.Role) {
		if (!SnowflakeRegex.test(item.value)) {
			return formatError(`Item of type ${item.type} must have a Snowflake value.`, 400);
		}
		const guildRoles = await botRest.guild.getGuildRoles({ body: {}, guildId });

		if (!guildRoles.find((r) => r.id === item.value)) {
			return formatError(`Unknown guild role ${item.value} for item of type ${item.type}`, 404);
		}
	}

	if (item.type === ItemType.Cosmetic && !ImageUrlRegex.test(item.value)) {
		return formatError(`Item of ${item.type} must have a valid image URL value.`, 400);
	}

	if (item.type === ItemType.Weapon) {
		return formatError(`I'm a teapot`, 418);
	}

	if (
		item.type === ItemType.IncomeMultiplier &&
		!AcceptedIncomeMultiplierValueRegex.test(item.value)
	) {
		return formatError(
			`Item of type ${item.type} must have a valid AcceptedIncomeMultiplierValueRegex value.`,
			400
		);
	}

	if (item.type === ItemType.Other && item.value) {
		return formatError(`Item of type ${item.type} must have a null value.`, 400);
	}
}
