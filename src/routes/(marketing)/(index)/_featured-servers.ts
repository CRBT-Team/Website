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
		iconUrl: '/assets/logos/clembs.png',
		inviteCode: '6uNwP46',
		name: 'Clembs Server',
		category: 'Coding & Gaming',
		approximateMembers: 90
	},
	{
		id: '403966971147845636',
		iconUrl:
			'https://cdn.discordapp.com/attachments/589185383779270656/1029107988935491634/feb2022.jpg',
		inviteCode: 'R8yB47Y',
		name: 'bkly Community',
		category: 'Art & Design',
		approximateMembers: 180
	},
	{
		id: '717683408012181505',
		name: 'Emotiguy Appreciation',
		iconUrl: 'https://cdn.discordapp.com/emojis/717683480787550228.png',
		approximateMembers: 540,
		category: 'Emojis',
		inviteCode: 'N5MtRsSuyB'
	}
];
