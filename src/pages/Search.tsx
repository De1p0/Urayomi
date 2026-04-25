import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Book from "../components/shared/Book";
import { useConfigStore } from "../stores/ConfigStore";
import Searchbar from "../components/layout/SearchBar";
import { Manga } from "../types/Manga";

export default function Search() {
    const location = useLocation();
    const { config, updateConfig } = useConfigStore();
    const { searchResults, searchQuery } = config;

    const [expandedSources, setExpandedSources] = useState<Record<string, boolean>>({});

    useEffect(() => {
        if (location.state?.results && location.state?.query) {
            updateConfig((config) => {
                config.searchResults = location.state.results;
                config.searchQuery = location.state.query;
            });
        }
    }, [location.state?.results, location.state?.query, updateConfig]);

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

            {config.isMobile && <Searchbar />}

            <div key={searchQuery} className="flex flex-col gap-12">
                {Object.values(searchResults).flat().length !== 0 &&
                    Object.keys(searchResults).map((source) => {
                        const doExpand = expandedSources[source];
                        const results = searchResults[source] || [];


                        return (
                            <section key={source} className="flex flex-col gap-4">
                                <div className="flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-4 grow">
                                        <h2 className="text-primary-text font-black text-xl whitespace-nowrap">
                                            {source}
                                        </h2>
                                        <div className="h-px w-full bg-white/10" />
                                        <span className="text-sm text-primary-text/70 font-medium px-2 py-1 bg-primary-text/5 rounded">
                                            {results.length}
                                        </span>
                                    </div>


                                </div>

                                <div className="relative">
                                    <div
                                        className={`flex flex-wrap gap-5 overflow-hidden transition-[max-height] duration-500 ease-in-out ${doExpand ? "max-h-[5000px]" : "max-h-[320px]"
                                            }`}
                                    >
                                        {results.map((book: Manga) => (
                                            <Book key={`${source}-${book.name}`} manga={book} />
                                        ))}
                                    </div>


                                    <div className="flex justify-end w-full mt-4">
                                        <button
                                            className="px-6 py-2 bg-surface hover:bg-surface-hover text-primary-text rounded-lg text-xs font-bold transition-all"
                                            onClick={() => toggleExpand(source)}
                                        >
                                            {doExpand
                                                ? "Show Less"
                                                : `Show All from ${source}`}
                                        </button>
                                    </div>

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