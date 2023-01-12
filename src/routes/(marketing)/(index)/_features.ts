import Trophy from '$lib/svg/Trophy.svelte';
import {
	Hand,
	Coins,
	Gift,
	LayoutList,
	CheckSquare,
	Languages,
	Globe2,
	BellRing
} from 'lucide-svelte';
import type { Feature } from 'src/routes/(app)/dashboard/_features';

export const marketingFeatures: Feature[] = [
	{
		name: 'Welcome & Farewell messages',
		description: 'Send fully customizable messages and assign roles when a member joins or leaves.',
		icon: Hand
	},
	{
		name: 'Economy',
		description:
			"Create your own server economy system, from the currency to each command's income, down to the items store!",
		icon: Coins
	},
	{
		name: 'Giveaways',
		description:
			'Give back to your community by create randomized giveaway with customizable rules.',
		icon: Gift
	},
	{
		name: 'Role Pickers',
		description: 'Customizable menus for self-assignable roles, similar to "reaction roles".',
		icon: LayoutList
	},
	{
		name: 'Polls',
		description: 'Poll your members right within your server.',
		icon: CheckSquare
	},
	{
		name: 'Multilingual',
		description:
			'CRBT works in many languages thanks to fan translations, to which <a href="/translate">you can contribute</a>!',
		icon: Globe2
	},
	{
		name: 'Translator',
		description:
			'Translate messages & their images instantly, or any kind of text in over 30 languages.',
		icon: Languages
	},
	{
		name: 'Reminders',
		description:
			"Get reminded about a message, a command's cooldown and everything in between, and manage them with ease.",
		icon: BellRing
	}
];
