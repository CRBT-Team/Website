import Scroll from "$lib/svg/Scroll.svelte";
import { Brush, Settings2 } from "lucide-svelte";
import { features } from "../../../routes/dashboard/_features";

export interface SidebarItem {
  label: string;
  items: {
    label: string;
    icon: any;
    href: string;
  }[]
}

export const items: SidebarItem[] = [
  {
    label: '<servername>',
    items: [
      {
        label: 'Overview',
        href: '',
        icon: Settings2
      },
      {
        label: 'Appearance',
        href: 'appareance',
        icon: Brush
      },
      {
        label: 'Logs',
        href: 'logs',
        icon: Scroll
      },
      // {
      //   label: 'CRBT+',
      //   href: 'plus',
      //   icon: Plus
      // }
    ]
  },
  {
    label: 'Features',
    items: features.map(({ icon, name, href }) => ({
      href,
      icon,
      label: name,
    }))
  }
]