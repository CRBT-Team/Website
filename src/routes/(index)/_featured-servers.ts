export interface FeaturedServer {
	name: string;
	iconUrl: string;
	inviteCode: string;
	id: string;
	category: string;
	approximateMembers: number;
}

export const servers: FeaturedServer[] = [
	{
		id: '738747595438030888',
		iconUrl: '/assets/avatars/habile.png',
		inviteCode: '6uNwP46',
		name: "habile's hideout",
		category: 'General Purpose',
		approximateMembers: 80
	},
	{
		id: '403966971147845636',
		iconUrl:
			'/assets/avatars/bkly-community.png',
		inviteCode: 'R8yB47Y',
		name: 'bkly Community',
		category: 'Art & Design',
		approximateMembers: 160
	},
	{
		id: '717683408012181505',
		name: 'Emotiguy Appreciation',
		iconUrl: 'https://cdn.discordapp.com/emojis/717683480787550228.png',
		approximateMembers: 630,
		category: 'Emojis',
		inviteCode: 'N5MtRsSuyB'
	},
];
