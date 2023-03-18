import { json, type RequestHandler } from '@sveltejs/kit';
import { errors, validateAccess } from '$lib/api';
import { prisma } from '$lib/prisma';
import { formatError, economyNotSetupError } from '$lib/api/genericErrors';
import { EconomyStructure } from '$lib/api/structures/guild/economy/economy';
import { fetchWithCache } from '$lib/cache';
import {
	getGuildSettings,
	prismaGuildInclude,
	type FullGuildSettings
} from '$lib/api/guild-settings';
import type { RequestEvent } from './$types';

export const GET: RequestHandler = async ({ params, request }) => {
	let { errorMessage } = await validateAccess(
		request,
		{ guildId: params.guildId },
		{ guild: true }
	);
	if (errorMessage) return errorMessage;

	const { economy } = await getGuildSettings(params.guildId);

	if (!economy) {
		return economyNotSetupError(params.guildId);
	}

	return json({
		id: params.guildId,
		currency_name_singular: economy.currency_name_singular,
		currency_name_plural: economy.currency_name_plural,
		currency_symbol: economy.currency_symbol,
		transaction_logs_channel_id: economy.transaction_logs_channel_id,
		categories: economy.categories,
		item_count: economy.items.length
		// work_cooldown: economy.work_cooldown,
		// work_strings: economy.work_strings,
		// work_reward: economy.work_reward,
		// daily_reward: economy.daily_reward,
		// weekly_rewards: economy.weekly_rewards
	});
};

export const POST = handleUpsertEconomyRequest;
export const PATCH = handleUpsertEconomyRequest;

async function handleUpsertEconomyRequest({ params, request }: RequestEvent): Promise<Response> {
	let { errorMessage } = await validateAccess(
		request,
		{ guildId: params.guildId },
		{ guild: true }
	);
	if (errorMessage) return errorMessage;

	request;
	const body = await request.json();

	if (!body) return errors.badRequest();

	try {
		const parsedData =
			request.method === 'POST'
				? EconomyStructure.parse(body)
				: EconomyStructure.partial().parse(body);

		const { economy } = await getGuildSettings(params.guildId);

		if (request.method === 'PATCH' && !economy) {
			return economyNotSetupError(params.guildId);
		}

		const { economy: newEconomy } = await fetchWithCache<FullGuildSettings>(
			`settings:${params.guildId}`,
			() =>
				prisma.guild.update({
					where: { id: params.guildId },
					data: {
						economy: {
							upsert: {
								create: parsedData,
								update: parsedData
							}
						}
					},
					include: prismaGuildInclude
				}),
			true
		);

		return json({
			id: params.guildId,
			currency_name_singular: newEconomy.currency_name_singular,
			currency_name_plural: newEconomy.currency_name_plural,
			currency_symbol: newEconomy.currency_symbol,
			transaction_logs_channel_id: newEconomy.transaction_logs_channel_id,
			categories: newEconomy.categories,
			item_count: newEconomy.items.length
			// work_cooldown: newEconomy.work_cooldown,
			// work_strings: newEconomy.work_strings,
			// work_reward: newEconomy.work_reward,
			// daily_reward: newEconomy.daily_reward,
			// weekly_rewards: newEconomy.weekly_rewards
		});
	} catch (e) {
		return formatError(e);
	}
}
