import type { APIEmbed } from 'discord-api-types/v10';

export const commands: {
	name: string;
	description: string;
	embed: APIEmbed;
}[] = [
	{
		name: 'user info',
		description: "Get a user's info.",
		embed: {
			author: {
				name: 'CRBT#0456 - User info',
				icon_url: '/assets/logos/crbt-small.png'
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
				url: '/assets/logos/crbt-small.png'
			},
			color: 15888775
		}
	},
	{
		name: 'search',
		description: 'Search something on the web.',
		embed: {
			title: 'Web results for "CRBT Discord"',
			fields: [
				{
					name: 'CRBT (@crbt_app) / Twitter',
					value: '**[🔒 twitter.com › crbt_app](https://twitter.com/crbt_app)**'
				},
				{
					name: 'CRBT | Discord Bot Labs',
					value:
						'**[🔒 bots.discordlabs.org › bot › 595731552709771264](https://bots.discordlabs.org/bot/595731552709771264)**\nCRBT The Discord companion made for you. CRBT aims to replace most of the bots...'
				}
			],
			color: 15888775
		}
	},
	{
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
				url: '/assets/logos/crbt-small.png'
			},
			description:
				'CRBT includes many customizable features like Economy, Moderation Reports, the Welcome message and its Accent Color! Scroll down for a full list of features!',
			color: 15888775
		}
	},
	{
		name: 'poll',
		description: 'Create a poll.',
		embed: {
			author: {
				name: 'CRBT Poll'
			},
			title: 'What new feature would you like to see?',
			fields: [
				{
					name: 'More dogs',
					value:
						'<:progressfillstart:971334221782196234><:progressfill:971334221450862642><:progressfill:971334221450862642><:progressfill:971334221450862642><:progressfill:971334221450862642><:progressfill:971334221450862642><:progressfillcut:971334221455036456><:progressempty:1050093579525173338><:progressempty:1050093579525173338><:progressemptyend:971334221425700894>\n75% • 32 vote(s)'
				},
				{
					name: 'More cats',
					value:
						'<:progressfillstart:971334221782196234><:progressfill:971334221450862642><:progressfillcut:971334221455036456><:progressempty:1050093579525173338><:progressempty:1050093579525173338><:progressempty:1050093579525173338><:progressempty:1050093579525173338><:progressempty:1050093579525173338><:progressempty:1050093579525173338><:progressemptyend:971334221425700894>\n25% • 16 vote(s)'
				}
			]
		}
	},
	{
		name: 'reminder new',
		description: 'Set a reminder.',
		embed: {
			title: '<:success:1035880323482931230> Reminder set!',
			description: 'You will be reminded by DM in 2 years.',
			fields: [
				{
					name: 'Subject',
					value: 'Grow a beard.'
				}
			],
			color: 5305201
		}
	}
];
