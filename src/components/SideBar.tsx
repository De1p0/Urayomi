import {
    BookmarkIcon,
    ClockIcon,
    MagnifyingGlassIcon,
    Cog6ToothIcon,
    GlobeAltIcon,
    Bars3Icon
} from "@heroicons/react/24/outline";


export default function Sidebar() {
    // we use name once i add expansion aaa
    const menuItems = [
        { name: "Burger", icon: Bars3Icon, href: "#" },
        { name: "Library", icon: BookmarkIcon, href: "#" },
        { name: "Browse", icon: GlobeAltIcon, href: "#" },
        { name: "History", icon: ClockIcon, href: "#" },
        { name: "Search", icon: MagnifyingGlassIcon, href: "#" },
    ];

    return (
        <aside className="h-full bg-surface p-2 pt-0 text-copy">

            <nav className="flex h-full mt-1">
                <ul className="space-y-2 flex flex-col">
                    {menuItems.map((item) => (
                        <li key={item.name}>
                            <a
                                href={item.href}
                                className="flex items-center gap-3 p-2 rounded-md transition-all duration-200 
                             hover:bg-white/5 hover:text-primary group"
                            >
                                <item.icon className="w-5 h-5 text-copy-light group-hover:text-primary" />
                            </a>
                        </li>
                    ))}
                    <div className="flex-1 flex"></div>


                    <li className="pt-4 border-t border-white/10">
                        <a
                            className="flex items-center gap-3 p-2 rounded-md transition-all duration-200 
                             hover:bg-white/5 hover:text-primary group"
                        >
                            <Cog6ToothIcon className="w-5 h-5 text-copy-light group-hover:text-primary" />
                        </a>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}