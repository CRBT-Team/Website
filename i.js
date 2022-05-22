import { readFileSync } from 'fs';
import { compile, escapeSvelte } from 'mdsvex';
// import {  } from "@sveltejs/kit";

const posts = [
	{
		url: '11.5-changelog',
		categpry: 'Changelog',
		title: "What's new in CRBT 11.5?",
		description:
			'Added Role Pickers, Moderation, command localization and deprecation/removal of several features and commands.',
		author: ['bkly', 'Clembs'],
		date: new Date('2022-04-24'),
		minutes: 10,
		banner: '/assets/hero-image.png'
	}
];

const getPost = async (blogUrl) => {
	const meta = posts.find((p) => p.url === blogUrl);
	if (!meta) return null;
	const post = readFileSync(`./${blogUrl}.mdx`, 'utf8');

	return await compile(escapeSvelte(post));
};

console.log(await getPost('11.5-changelog'));
