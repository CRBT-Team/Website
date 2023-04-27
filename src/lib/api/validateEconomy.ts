import { economyNotSetupError, formatError } from './genericErrors';
import type { FullGuildSettings } from './guild-settings';

export async function validateEconomy(
	economy: FullGuildSettings['economy'] | null,
	params: {
		guildId: string;
		categoryId?: string;
		itemId?: string;
	},
	capacities?: {
		items?: true;
		categories?: true;
	}
) {
	if (!economy) return economyNotSetupError(params.guildId);

	if (params.categoryId) {
		const category = economy.categories.find(({ id }) => id === params.categoryId);

		if (!category) return formatError(`Category not found.`, 404);
	}

	if (params.itemId) {
		const item = economy.items.find(({ id }) => id === params.itemId);

		if (!item) return formatError(`Item not found.`, 404);
	}

	if (capacities) {
		if (capacities.categories && economy.categories.length === 10) {
			return formatError(`Max category capacity of 10 reached for Guild ${params.guildId}.`);
		}

		if (capacities.items) {
			if (economy.items.length === 10) {
				return formatError(`Max total item capacity of 100 reached for Guild ${params.guildId}.`);
			}

			const category = economy.categories.find(({ id }) => id === params.categoryId);

			if (category.items.length >= 20) {
				return formatError(`Max item capacity of 20 reached for Category ${category.id}.`);
			}
		}
	}
}
