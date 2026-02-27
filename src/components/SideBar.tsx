import { useEffect, useRef, useState } from "react";
import {
    BookmarkIcon,
    ClockIcon,
    MagnifyingGlassIcon,
    Cog6ToothIcon,
    GlobeAltIcon,
    Bars3Icon
} from "@heroicons/react/24/outline";

export default function Sidebar() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [currentTab, setCurrentTab] = useState("Library")
    const sidebarRef = useRef<HTMLElement>(null);

    const menuItems = [
        { name: "Library", icon: BookmarkIcon, href: "#" }, // ill set when im not lazy
        { name: "Browse", icon: GlobeAltIcon, href: "#" },
        { name: "History", icon: ClockIcon, href: "#" },
        { name: "Search", icon: MagnifyingGlassIcon, href: "#" },
    ];


    return (
        <aside
            ref={sidebarRef}
            className={`h-full p-2 pt-0 text-copy overflow-hidden transition-all duration-300 ease-in-out bg-surface
              ${isExpanded ? "w-64 z-40" : "w-13 z-20 "} absolute left-0 top-0`} // for some reason backdrop doesnt work here no clue why plus im sleep deprived rn
            onBlur={(e) => {
                // Check if the new focus target is outside the sidebar
                if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                    setIsExpanded(false);
                }
            }}
        // onMouseEnter={() => setIsExpanded(true)} // this will be a config setting
        // onMouseLeave={() => setIsExpanded(false)}
        >
            <nav className="flex flex-col h-full mt-1">
                <ul className="space-y-2 flex flex-col h-full">
                    <li className="border-b pb-2 border-white/10">
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="flex h-10 items-center p-2 rounded-md hover:bg-white/5 group gap-3"
                        >
                            <Bars3Icon className="w-5 h-5 shrink-0 text-copy-light" />
                        </button>
                    </li>

                    {menuItems.map((item) => (
                        <li key={item.name}>
                            <a
                                href={item.href}
                                className={`flex h-10 items-center p-2 rounded-md hover:bg-white/5 group gap-3 ${item.name == currentTab && "text-accent"}`}
                            >
                                <item.icon className="w-5 h-5 shrink-0 text-copy-ligh" />
                                {isExpanded && <span className="whitespace-nowrap">{item.name}</span>}
                            </a>
                        </li>
                    ))}

                    <div className="flex-1"></div>

                    <li className="pt-4 border-t border-white/10">
                        <a
                            href="#"
                            className="flex h-10 items-center p-2 rounded-md hover:bg-white/5 group gap-3"
                        >
                            <Cog6ToothIcon className="w-5 h-5 shrink-0 text-copy-light" />
                            {isExpanded && <span className="whitespace-nowrap">Settings</span>}
                        </a>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}