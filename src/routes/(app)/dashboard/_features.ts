import { LogIn, LogOut } from 'lucide-svelte';

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
		description: 'Actions to execute and a customizable message to send when a new member joins.',
		icon: LogIn,
		href: 'welcome',
		isToggleable: true
	},
	{
		name: 'Farewell message',
		description:
			'Actions to execute and a customizable message to send when somebody leaves the server.',
		icon: LogOut,
		href: 'farewell',
		isToggleable: true
	}
];
