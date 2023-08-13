import Discord from '$lib/svg/brands/discord.svelte';
import Twitter from '$lib/svg/brands/twitter.svelte';
import Purplet from '$lib/svg/Purplet.svelte';
import { BookOpen, ExternalLink, Github, Heart, Lock, UserPlus } from 'lucide-svelte';
import Scroll from '$lib/svg/Scroll.svelte';

export interface PageLink {
	icon: any;
	href: string;
	label: string;
}

export const links: PageLink[] = [
	{
		href: '/donate',
		icon: Heart,
		label: 'Donate'
	},
	{
		href: '/invite',
		icon: UserPlus,
		label: 'Add CRBT to Discord'
	},
	{
		href: '/topgg',
		icon: ExternalLink,
		label: 'Vote on Top.gg'
	},
	{
		href: '/discord',
		icon: Discord,
		label: 'Join the CRBT Community'
	},
	{
		href: '/docs',
		icon: BookOpen,
		label: 'Docs'
	},
	{
		href: '/discordbots',
		icon: ExternalLink,
		label: 'Discord Bots page'
	},
	{
		href: '/acknowledgements',
		icon: Scroll,
		label: 'Acknowledgements'
	},
	{
		href: '/github',
		icon: Github,
		label: 'GitHub'
	},
	{
		href: '/twitter',
		icon: Twitter,
		label: 'Twitter'
	},
	{
		href: '/policy',
		icon: Lock,
		label: 'Privacy Policy'
	},
	{
		href: '/terms',
		icon: Scroll,
		label: 'Terms of Service'
	},
	{
		href: 'https://purplet.js.org',
		icon: Purplet,
		label: 'Purplet, the Discord app framework by CRBT.'
	}
];
