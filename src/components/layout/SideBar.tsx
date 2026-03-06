import { useRef, useState } from "react";
import {
    BookmarkIcon,
    ClockIcon,
    MagnifyingGlassIcon,
    Cog6ToothIcon,
    Bars3Icon,
    ArrowDownOnSquareStackIcon,
    GlobeAltIcon
} from "@heroicons/react/24/outline";
import { NavLink, useLocation } from "react-router-dom";
import { useConfigStore } from "../../stores/configStore";


// browse might not be implemented 
const MENU_ITEMS = [
    { name: "Library", icon: BookmarkIcon, href: "library" },
    { name: "Downloads", icon: ArrowDownOnSquareStackIcon, href: "downloads" },
    { name: "Browse", icon: GlobeAltIcon, href: "browse" },
    { name: "History", icon: ClockIcon, href: "history" },
    { name: "Search", icon: MagnifyingGlassIcon, href: "search" },
];

export default function Sidebar() {
    const [isExpanded, setIsExpanded] = useState(false);
    const sidebarRef = useRef<HTMLElement>(null);
    const { config, setConfig } = useConfigStore();

    const location = useLocation();


    return (
        <aside
            ref={sidebarRef}
            tabIndex={-1}
            onBlur={(e) => {
                if (!sidebarRef.current?.contains(e.relatedTarget as Node)) {
                    setIsExpanded(false);
                }
            }}
            className={`h-full p-2 pt-0 text-copy overflow-hidden transition-all duration-300 ease-in-out bg-surface sidebar
              ${isExpanded ? "w-64 z-40" : "w-13 z-20 "} absolute left-0 top-0`}
        >
            <nav className="flex flex-col h-full mt-1">
                <ul className="space-y-2 flex flex-col h-full">
                    <li className="border-b pb-2 border-white/10">
                        <button
                            type="button"
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="flex h-10 items-center p-2 rounded-md hover:bg-white/5 group gap-3"
                            aria-label="Toggle Sidebar"
                        >
                            <Bars3Icon className="w-5 h-5 shrink-0 text-copy-light" />
                        </button>
                    </li>

                    {MENU_ITEMS.map((item) => {
                        const isActive = config.currentPage === item.href;
                        return (
                            <li key={item.name}>
                                <button
                                    onClick={() => setConfig("currentPage", item.href as PageName)}
                                    className={`flex w-full h-10 items-center p-2 rounded-md hover:bg-white/5 group gap-3 ${isActive ? "text-accent" : ""}`}
                                >
                                    <item.icon className="w-5 h-5 shrink-0 text-copy-light" />
                                    {isExpanded && <span className="whitespace-nowrap">{item.name}</span>}
                                </button>
                            </li>
                        );
                    })}

                    <div className="flex-1" aria-hidden="true"></div>

                    <li className="pt-4 border-t border-white/10">
                        <button
                            onClick={() => setConfig("currentPage", "settings")}
                            className={`flex h-10 items-center p-2 rounded-md hover:bg-white/5 group gap-3 ${config.currentPage === "settings" ? "text-accent" : ""}`}
                        >
                            <Cog6ToothIcon className="w-5 h-5 shrink-0 text-copy-light" />
                            {isExpanded && <span className="whitespace-nowrap">Settings</span>}
                        </button>
                    </li>
                </ul>
            </nav>
        </aside >
    );
}