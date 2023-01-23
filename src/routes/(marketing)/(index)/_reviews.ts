export interface Review {
	username: string;
	message: string;
	source: 'twitter' | 'topgg';
	avatar: string;
}

export const reviews: Review[] = [
	{
		message:
			"It got <b>everything you need</b> and devs are constantly adding everything you will need all the features + best looking bot, <b>crafted with care and attention to details</b>, you won't need any other bot",
		source: 'topgg',
		username: 'bkly',
		avatar: '/assets/avatars/bkly.png'
	},
	{
		message:
			'<b>Great bot for starting servers.</b> It does things that, in normal circumstances would require you to invite tons of bots! It can entertain members, help mods and many more! Also updates are cool. <b>Love it!</b>',
		source: 'topgg',
		username: 'Y0urD0ctor',
		avatar: '/assets/avatars/y0urd0ctor.png'
	},
	{
		message: '@crbt_app go check it out',
		source: 'twitter',
		username: 'Trubiso',
		avatar: '/assets/avatars/trubiso.png'
	}
];
