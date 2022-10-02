import { CheckSquare, Coins, Gift, Hand, Languages, LayoutList, List, LogIn, LogOut } from 'lucide-svelte';

export interface Feature {
	name: string;
	description: string;
	icon: any;
	badge?: string;
	href?: string;
	isToggleable?: boolean;
}

export const features: Feature[] = [
	{
		name: 'Welcome message',
		description:
			'Actions to execute and a customizable message to send when a new member joins.',
		icon: LogIn,
		href: 'welcome',
		isToggleable: true
	},
	{
		name: 'Farewell message',
		description: 'Actions to execute and a customizable message to send when somebody leaves the server.',
		icon: LogOut,
		href: 'farewell',
		isToggleable: true
	},
	{
		name: 'Giveaways',
		description: 'Create customizable giveaways and offer prizes to your members.',
		icon: Gift,
		isToggleable: true,
	},
	{
		name: 'Role Pickers',
		description: 'Self-assignable roles using modern menus, similar to "reaction roles".',
		icon: LayoutList,
		href: 'role-pickers'
	},
	{
		name: 'Polls',
		description: 'Create polls for your members to vote on specific subjects.',
		icon: CheckSquare,
		href: 'role-pickers'
	},
	{
		name: 'Multilingual',
		description:
			'CRBT is partially localized in English, French, German, Spanish, Portuguese, Russian, Vietnamese, Romanian... and more soon thanks for the fan translations',
		icon: Languages
	},
	{
		name: 'Logging',
		description:
			"Choose a channel to send logs of your server's deleted & edited messages, member joins/leaves and moderation actions.",
		icon: List,
		href: 'logging'
	},
	{
		name: 'Economy',
		description:
			'Create your own server economy system, from the currency to each command\'s income, down to the items store!',
		icon: Coins,
		isToggleable: true
	}
];
