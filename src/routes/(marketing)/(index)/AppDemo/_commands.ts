import type { APIEmbed } from 'discord-api-types/v10';

export const commands = new Map<
	number,
	{
		name: string;
		description: string;
		embed: APIEmbed;
	}
>()
	.set(1, {
		name: 'user info',
		description: "Get a user's info.",
		embed: {
			author: {
				name: 'CRBT#0456 - User info',
				icon_url: '/assets/logos/crbt.png'
			},
			fields: [
				{
					name: 'ID',
					value: '595731552709771264'
				},
				{
					name: 'Joined Discord',
					value: 'July 2, 2019 11:44 PM • 4 years ago'
				}
			],
			thumbnail: {
				url: '/assets/logos/crbt.png'
			},
			color: 15888775
		}
	})
	.set(2, {
		name: 'search',
		description: 'Search something on the web.',
		embed: {
			title: 'Web results for "CRBT Discord"',
			fields: [
				{
					name: 'CRBT | Discord Bot Labs',
					value:
						':locked: bots.discordlabs.org › bot › 595731552709771264\nCRBT The Discord companion made for you. CRBT aims to replace most of the bots you have in one modern and convienient experience, from get...'
				}
			]
		}
	})
	.set(3, {
		name: 'settings',
		description: 'Set up CRBT for your server.',
		embed: {
			author: {
				name: 'CRBT Server Settings',
				icon_url:
					'https://media.discordapp.net/attachments/945417344656752712/1035572594444865537/settings.png'
			},
			title: 'CRBT Community / Overview',
			thumbnail: {
				url: '/assets/logos/crbt.png'
			},
			description:
				'CRBT includes many customizable features like Economy, Moderation Reports, the Welcome message and its Accent Color! Scroll down for a full list of features!',
			color: 15888775
		}
	});
