import { DiscordSnowflake } from '@sapphire/snowflake';

export function generateSnowflake(date: Date = new Date()) {
	return DiscordSnowflake.generate({
		timestamp: date
	});
}
