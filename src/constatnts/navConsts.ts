import {
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

type navigationType = {
  name: string,
  href: string,
  icon: React.ForwardRefExoticComponent<React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & { title?: string, titleId?: string } & React.RefAttributes<SVGSVGElement>>
  current: boolean
}
type adaptiveViewType = {
  id: number,
  name: string,
  href: string,
  icon: string,
  current: boolean
}
type userNavigationType = {
  name: string,
  href: string
}

const navigation : navigationType[] = [
  { name: "Dashboard", href: "#", icon: HomeIcon, current: true },
  { name: "Realtime View", href: "#", icon: UsersIcon, current: false },
  { name: "Administration", href: "#", icon: FolderIcon, current: false },
  { name: "Reports", href: "#", icon: ChartPieIcon, current: false },
  { name: "Maintenance", href: "#", icon: DocumentDuplicateIcon, current: false },
];
const teams : adaptiveViewType[] = [
  { id: 1, name: "Heroicons", href: "#", icon: "public/car-solid.svg", current: false },
  // { id: 2, name: "Tailwind Labs", href: "#", icon: "T", current: false },
  // { id: 3, name: "Workcation", href: "#", icon: "W", current: false },
];
const userNavigation : userNavigationType[] = [
  { name: "Your profile", href: "#" },
  { name: "Sign out", href: "#" },
];

export {navigation,teams,userNavigation};