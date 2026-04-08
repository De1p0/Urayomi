import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import Book from "../components/shared/Book";
import { useConfigStore } from "../stores/configStore";
import { fixBook } from "../utils/fixBook";
import { Manga } from "../types/Manga";

export default function Library() {
    const [open, setOpen] = useState(false);
    const [filter, setFilter] = useState("All");
    const [books, setBooks] = useState<Manga[]>([]);
    const { config } = useConfigStore();

    const library = [
        {
            name: "RuriDragon",
            imageUrl: "https://uploads.mangadex.org/covers/141609b6-cf86-4266-904c-6648f389cdc9/216d1ce9-2195-4ad3-9502-be95b06a3502.jpg",
            link: "/manga/141609b6-cf86-4266-904c-6648f389cdc9",
            source: "MangaDex"
        }
    ];

    useEffect(() => {
        async function fetchBooks() {
            const bookDetails = await Promise.all(
                library.map(async (book) => {
                    console.log(book)
                    return await fixBook(book, config);
                })
            ) as Manga[];

            setBooks(bookDetails);
        }

        fetchBooks();
    }, [config.installedSources]);

    return (
        <div className="w-full h-full p-8">
            <div className="flex items-center justify-between mb-5">
                <h1 className="text-2xl font-bold text-primary-text tracking-tight">Library</h1>
                <div className="relative">
                    <div
                        onClick={() => setOpen(!open)}
                        className="flex items-center gap-1 px-3 py-1 cursor-pointer hover:bg-primary-text/5 rounded transition-colors"
                    >
                        <span className="text-xs font-medium text-primary-text">{filter}</span>
                        <ChevronDownIcon
                            className={`w-3.5 h-3.5 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
                        />
                    </div>

                    {open && (
                        <>
                            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
                            <div className="absolute top-full right-0 mt-1 w-48 bg-surface border border-primary-text/10 rounded shadow-2xl backdrop-blur-md z-50 py-1">
                                {["All", "PEAK", "MID ASF"].map((f) => (
                                    <div
                                        key={f}
                                        onClick={() => { setFilter(f); setOpen(false); }}
                                        className={`px-4 py-2 text-[11px] cursor-pointer transition-colors ${filter === f
                                            ? "bg-primary-text/20 text-primary-text"
                                            : "text-primary-text hover:bg-primary-text/10 hover:text-primary-text/80"
                                            }`}
                                    >
                                        {f}
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>

            <div className="overflow-y-auto flex flex-wrap gap-5 content-start">
                {books.map((book, index) => (
                    <Book key={index} book={book} />
                ))}
            </div>
        </div>
    );
}