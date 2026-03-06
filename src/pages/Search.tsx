import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Manga } from "../types/ExtensionData";
import Book from "../components/shared/Book";
import { useConfigStore } from "../stores/configStore";

export default function Search() {
    const location = useLocation();
    const { config, setSearch } = useConfigStore();
    const { searchResults, searchQuery } = config;


    useEffect(() => {
        if (location.state?.results && location.state?.query) {
            setSearch(location.state.results, location.state.query);
        }
    }, [location.state, setSearch]);

    return (
        <div className="w-full h-full p-8 overflow-scroll">
            <header className="mb-6">
                <h1 className="text-2xl font-bold text-primary-text tracking-tight">
                    Results for "{searchQuery}"
                </h1>
            </header>

            <div className="overflow-y-scroll flex flex-wrap gap-5 content-start">
                {searchResults?.map((book: Manga) => (
                    <Book key={book.name} book={book} />
                ))}
            </div>
        </div>
    );
}