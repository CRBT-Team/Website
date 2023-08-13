import type { APIEmbed } from 'discord-api-types/v10';

export const commands: {
	name: string;
	description: string;
	content?: string;
	embed: APIEmbed;
}[] = [
	{
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
	},
	{
		name: 'search',
		description: 'Search something on the web.',
		embed: {
			title: 'Web results for "CRBT Discord"',
			fields: [
				{
					name: 'CRBT | The perfect just-about-anything Discord app.',
					value:
						'**[🔒 crbt.app](https://crbt.app/)**\nCRBT includes brilliantly crafted tools to help you interact with your community...'
				},
				{
					name: 'CRBT | Discord Bot Labs',
					value:
						'**[🔒 bots.discordlabs.org › bot › 595731552709771264](https://bots.discordlabs.org/bot/595731552709771264)**\nCRBT The Discord companion made for you. CRBT aims to replace most of the bots...'
				}
			],
			color: 11477828
		}
	},
	{
		name: 'server settings',
		description: "Configure CRBT's Server Settings.",
		embed: {
			author: {
				name: 'CRBT Community - Server Settings',
				icon_url:
					'https://cdn.discordapp.com/attachments/945417344656752712/1112742568652984420/CRBT_Settings.png'
			},
			title: 'Overview',
			thumbnail: {
				url: '/assets/logos/crbt.png'
			},
			description:
				'CRBT includes many customizable features like Theming, Moderation, Welcome & Farewell messages, and more!\nScroll down this page for a full list of features!',
			color: 11477828
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
					name: '🐶 More dogs!!',
					value:
						'<:progressfillstart:971334221782196234><:progressfill:971334221450862642><:progressfill:971334221450862642><:progressfill:971334221450862642><:progressfill:971334221450862642><:progressfill:971334221450862642><:progressfillcut:971334221455036456><:progressempty:1050093579525173338><:progressempty:1050093579525173338><:progressemptyend:971334221425700894>\n75% • 32 vote(s)'
				},
				{
					name: '😺 More cats!!',
					value:
						'<:progressfillstart:971334221782196234><:progressfill:971334221450862642><:progressfillcut:971334221455036456><:progressempty:1050093579525173338><:progressempty:1050093579525173338><:progressempty:1050093579525173338><:progressempty:1050093579525173338><:progressempty:1050093579525173338><:progressempty:1050093579525173338><:progressemptyend:971334221425700894>\n25% • 16 vote(s)'
				}
			]
		}
	},
	{
		name: 'reminder new',
		description: 'Set a reminder.',
		content:
			'<:success:1035880323482931230> Reminder set! Use /reminder list to manage your reminders.',
		embed: {
			author: {
				name: 'clembs - Reminders (5)',
				icon_url: '/assets/avatars/clembs.png'
			},
			title: 'Grow a beard',
			description: `in 2 years\nDestination: DMs\nCreated on ${new Intl.DateTimeFormat('en-US', {
				day: 'numeric',
				month: 'long',
				year: 'numeric'
			}).format()} • Now`,
			color: 5305201
		}
	}
];
