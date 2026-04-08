import { useRef, useState } from "react";
import {
    BookmarkIcon,
    ClockIcon,
    MagnifyingGlassIcon,
    Cog6ToothIcon,
    Bars3Icon,
    GlobeAltIcon
} from "@heroicons/react/24/outline";
import { useConfigStore } from "../../stores/configStore";

const MENU_ITEMS = [
    { name: "Library", icon: BookmarkIcon, href: "library" },
    { name: "Browse", icon: GlobeAltIcon, href: "browse" },
    // { name: "History", icon: ClockIcon, href: "history" }, // history is boribngg who even uses this
    { name: "Search", icon: MagnifyingGlassIcon, href: "search" },
];

export default function Sidebar() {
    const [isExpanded, setIsExpanded] = useState(false);
    const sidebarRef = useRef<HTMLElement>(null);
    const { config, setConfig, setPage } = useConfigStore();

    if (config.isMobile) {
        return (
            <nav
                className="fixed bottom-0 left-0 right-0 bg-surface border-t border-white/10 z-40 flex items-center justify-around px-2"
                style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
            >
                {MENU_ITEMS.map((item) => {
                    const isActive = config.currentPage === item.href;
                    return (
                        <button
                            key={item.name}
                            onMouseUp={() => setConfig("currentPage", item.href as PageName)}
                            className={`flex flex-col items-center justify-center gap-0.5 w-12 h-14 rounded-md ${isActive ? "text-accent" : "text-copy-light"}`}
                        >
                            <item.icon className="w-5 h-5 shrink-0" />
                            <span className="text-[10px] whitespace-nowrap">{item.name}</span>
                        </button>
                    );
                })}
                <button
                    onMouseUp={() => setConfig("currentPage", "settings")}
                    className={`flex flex-col items-center justify-center gap-0.5 w-12 h-14 rounded-md ${config.currentPage === "settings" ? "text-accent" : "text-copy-light"}`}
                >
                    <Cog6ToothIcon className="w-5 h-5 shrink-0" />
                    <span className="text-[10px]">Settings</span>
                </button>
            </nav>
        );
    }

    return (
        <aside
            ref={sidebarRef}
            tabIndex={-1}
            onBlur={(e) => {
                if (!sidebarRef.current?.contains(e.relatedTarget as Node)) {
                    setIsExpanded(false);
                }
            }}
            className={`p-2 pt-0 text-copy overflow-hidden transition-all duration-300 ease-in-out bg-surface sidebar absolute left-0 top-0 h-full
                ${isExpanded ? "w-64 z-40" : "w-13 z-20"}`}
        >
            <nav className="flex flex-col h-full mt-1">
                <ul className="space-y-2 flex flex-col h-full">
                    <li className="border-b pb-2 border-primary-text/10">
                        <button
                            type="button"
                            onMouseUp={() => setIsExpanded(!isExpanded)}
                            className="flex h-10 items-center p-2 rounded-md hover:bg-primary-text/5 group gap-3"
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
                                    onMouseUp={() => {
                                        // if its already selected we go back to home page + (IMPROVES UX)
                                        if (isActive)
                                            setPage(config.currentPage, "", {})
                                        setConfig("currentPage", item.href as PageName)
                                    }}
                                    className={`flex w-full h-10 items-center p-2 rounded-md hover:bg-primary-text/5 group gap-3 ${isActive ? "text-accent" : ""}`}
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
                            onMouseUp={() => setConfig("currentPage", "settings")}
                            className={`flex h-10 items-center p-2 rounded-md hover:bg-primary-text/5 group gap-3 ${config.currentPage === "settings" ? "text-accent" : ""}`}
                        >
                            <Cog6ToothIcon className="w-5 h-5 shrink-0 text-copy-light" />
                            {isExpanded && <span className="whitespace-nowrap">Settings</span>}
                        </button>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}