import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Book from "../components/shared/Book";
import { useConfigStore } from "../stores/configStore";
import Searchbar from "../components/layout/SearchBar";
import { Manga } from "../types/Manga";

export default function Search() {
    const location = useLocation();
    const { config, updateConfig } = useConfigStore();
    const { searchResults, searchQuery } = config;

    const [expandedSources, setExpandedSources] = useState<Record<string, boolean>>({});

    // Update search results when location.state changes
    useEffect(() => {
        if (location.state?.results && location.state?.query) {
            updateConfig((config) => {
                config.searchResults = location.state.results;
                config.searchQuery = location.state.query;
            });
        }
    }, [location.state?.results, location.state?.query, updateConfig]);

    // Reset expanded sources when results or query changes
    useEffect(() => {
        setExpandedSources({});
    }, [searchQuery, searchResults]);

    const toggleExpand = (source: string) => {
        setExpandedSources((prev) => ({
            ...prev,
            [source]: !prev[source],
        }));
    };

    return (
        <div className="w-full h-full p-8 overflow-y-auto bg-background">
            <header className="mb-10">
                <h1 className="text-3xl font-black text-primary-text tracking-tight">
                    {searchQuery ? "Results for" : "Search"}{" "}
                    <span className="text-primary italic">
                        {searchQuery ? `“${searchQuery}”` : ""}
                    </span>
                </h1>
            </header>

            {config.isMobile && <Searchbar layer="background" />}

            <div key={searchQuery} className="flex flex-col gap-12">
                {Object.values(searchResults).flat().length !== 0 &&
                    Object.keys(searchResults).map((source) => {
                        const doExpand = expandedSources[source];
                        const results = searchResults[source] || [];
                        const doWrap = results.length > 5;

                        return (
                            <section key={source} className="flex flex-col gap-4">
                                <div className="flex items-center gap-4">
                                    <h2 className="text-primary-text font-black text-xl whitespace-nowrap">
                                        {source}
                                    </h2>
                                    <div className="h-px w-full bg-white/10" />
                                    <span className="text-sm text-primary-text/70 font-medium px-2 py-1 bg-primary-text/5 rounded">
                                        {results.length}
                                    </span>
                                </div>

                                <div className="relative group">
                                    <div
                                        className={`relative flex flex-wrap gap-5 overflow-hidden transition-[max-height] duration-500 ease-in-out ${doExpand ? "max-h-none" : "max-h-85"
                                            }`}
                                    >
                                        {results.map((book: Manga) => (
                                            <Book key={`${source}-${book.name}`} book={book} />
                                        ))}

                                        {!doExpand && doWrap && (
                                            <div className="absolute bottom-0 left-0 w-full h-20 bg-linear-to-t from-background via-background/80 to-transparent z-10 pointer-events-none" />
                                        )}
                                    </div>

                                    {doWrap && (
                                        <div
                                            className={`flex justify-center w-full mt-4 ${!doExpand ? "absolute -bottom-6 left-0 z-20" : ""
                                                }`}
                                        >
                                            <button
                                                className="px-8 py-2.5 bg-surface hover:bg-surface/80 text-primary-text rounded-xl text-sm font-bold transition-all"
                                                onClick={() => toggleExpand(source)}
                                            >
                                                {doExpand
                                                    ? "Show Less"
                                                    : `Show All from ${source}`}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </section>
                        );
                    })}

                {Object.values(searchResults).flat().length === 0 && (
                    <div className="text-primary-text/50 py-20 text-center">
                        No results found for this search.
                    </div>
                )}
            </div>
        </div>
    );
}