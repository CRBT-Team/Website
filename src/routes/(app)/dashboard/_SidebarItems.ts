import Scroll from '$lib/svg/Scroll.svelte';
import { Brush, Settings2 } from 'lucide-svelte';
import { features } from './_features';

export interface SidebarItem {
	label: string;
	items: {
		label: string;
		icon: any;
		href: string;
	}[];
}

export const items: SidebarItem[] = [
	{
		label: 'General',
		items: [
			{
				label: 'Dashboard',
				href: '',
				icon: Settings2
			},
			{
				label: 'Theming',
				href: 'theming',
				icon: Brush
			},
			{
				label: 'Logs',
				href: 'logs',
				icon: Scroll
			}
		]
	},
	{
		label: 'Features',
		items: features.map(({ icon, name, href }) => ({
			href,
			icon,
			label: name
		}))
	}
];
