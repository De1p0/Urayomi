import { useState } from "react";
import { useConfigStore } from "../../stores/ConfigStore";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Manga } from "../../types/Manga";
import { useSourceRegistry } from "../../stores/SourceStore";

export default function Searchbar() {
    const { updateConfig } = useConfigStore();
    const { sources } = useSourceRegistry();
    const [query, setQuery] = useState("");

    async function handleSearch() {
        if (!query.trim()) return;

        const results: Record<string, Manga[]> = {};
        console.log(sources, "sources")

        for (const sourceId of Object.keys(sources)) {
            const source = sources[sourceId];
            try {
                const res = await source.search(query, 1, source.getFilterList());

                if (res?.list) {
                    const items = res.list.map(item => ({
                        ...item,
                        source: source.source.name,
                        getDetail: source.getDetail.bind(source)
                    }));

                    results[source.source.name] = items;
                }
            } catch (error) {
                console.error(`Search failed for source ${sourceId}:`, error);
            }
        }

        updateConfig((config) => {
            config.searchResults = results;
            config.searchQuery = query;
            config.currentPage = "search";
            config.pageRoutes.search.route = "/";
        });
    }

    return (
        <div className={`w-full md:max-w-md`}>
            <div className="relative group w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                    <MagnifyingGlassIcon
                        className="w-3.5 h-3.5 text-primary-text/80 group-focus-within:text-accent/50 transition-colors cursor-pointer"
                        onClick={() => handleSearch()}
                    />
                </div>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") handleSearch(); }}
                    placeholder="Search manga..."
                    className="w-full bg-background border border-primary-text/5 text-xs text-primary-text rounded py-1 pl-7 pr-2 focus:outline-none focus:bg-background/90 focus:border-accent/90 transition-all"
                />
            </div>
        </div>
    )
}