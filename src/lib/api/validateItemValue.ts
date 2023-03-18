import type { Item } from '@prisma/client';
import { AcceptedIncomeMultiplierValueRegex, ItemType } from './structures/guild/economy/item';
import { ImageUrlRegex, SnowflakeRegex } from '@purplet/utils';
import { formatError } from './genericErrors';

export async function validateItemValue(item: Partial<Item>, guildId: string) {
	if (item.type !== ItemType.Other && !item.value) {
		return formatError(`Item must have a non-null value.`, 400);
	}

	if (item.type === ItemType.Role && !SnowflakeRegex.test(item.value)) {
		return formatError(`Item of type ${item.type} must have a Snowflake value.`, 400);
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
