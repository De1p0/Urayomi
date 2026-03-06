import { ArrowDownIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Book from "../components/shared/Book";

export default function Library() {
    // this is for test ONLY remove once library fn is fully implemented
    // image src will be cached offline until 12hr update
    const [open, setOpen] = useState(false);
    const [filter, setFilter] = useState("All")

    let library = [
        {
            "name": "RuriDragon",
            "imageUrl": "https://uploads.mangadex.org/covers/141609b6-cf86-4266-904c-6648f389cdc9/216d1ce9-2195-4ad3-9502-be95b06a3502.jpg",
            "link": "/manga/141609b6-cf86-4266-904c-6648f389cdc9"
        }

        // , {
        //     name: "Ruri Dragon",
        //     imageSrc: "https://upload.wikimedia.org/wikipedia/en/2/24/RuriDragon_vol._1_cover.jpg",
        //     currentChapter: 12,
        //     maximumChapters: 12,
        // }, {
        //     name: "Kimi wa Yotsuba no Clover", 
        //     imageSrc: "https://jpbookstore.com/cdn/shop/files/81NCqrHV51L._SL1500_1024x1024.jpg?v=1752505281",
        //     currentChapter: 12,
        //     maximumChapters: 333,
        // }                        
    ]
        ;

    return (
        <div className="w-full h-full p-8">
            {/* h-screen will break on webview */}

            <div className="flex items-center justify-between mb-5">
                <h1 className="text-2xl font-bold text-primary-text tracking-tight">
                    Library
                </h1>
                <div className="relative">
                    <div
                        onClick={() => setOpen(!open)}
                        className="flex items-center gap-1 px-3 py-1 cursor-pointer hover:bg-white/5 rounded transition-colors"
                    >
                        <span className="text-xs font-medium text-primary-text">
                            {filter}
                        </span>
                        <ChevronDownIcon
                            className={`w-3.5 h-3.5 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
                        />
                    </div>

                    {open && (
                        <>
                            <div
                                className="fixed inset-0 z-40"
                                onClick={() => setOpen(false)}
                            />

                            <div className="absolute top-full right-0 mt-1 w-48 bg-surface border border-primary-text/10 rounded shadow-2xl backdrop-blur-md z-50 py-1">
                                <div
                                    onClick={() => {
                                        setFilter("All")
                                        setOpen(false)
                                    }}
                                    className={`px-4 py-2 text-[11px] cursor-pointer transition-colors ${filter === "All"
                                        ? "bg-primary-text/20 text-primary-text"
                                        : "text-primary-text hover:bg-primary-text/10 hover:text-primary-text/80"
                                        }`}
                                >
                                    All
                                </div>

                                <div
                                    onClick={() => {
                                        setFilter("PEAK")
                                        setOpen(false)
                                    }}
                                    className={`px-4 py-2 text-[11px] cursor-pointer transition-colors ${filter === "PEAK"
                                        ? "bg-primary-text/20 text-primary-text"
                                        : "text-primary-text hover:bg-primary-text/10 hover:text-primary-text/80"
                                        }`}
                                >
                                    PEAK
                                </div>

                                <div
                                    onClick={() => {
                                        setFilter("MID ASF")
                                        setOpen(false)
                                    }}
                                    className={`px-4 py-2 text-[11px] cursor-pointer transition-colors ${filter === "MID ASF"
                                        ? "bg-primary-text/20 text-primary-text"
                                        : "text-primary-text hover:bg-primary-text/10 hover:text-primary-text/80"
                                        }`}
                                >
                                    MID ASF
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>

            <div className="overflow-y-auto flex flex-wrap gap-5 content-start">

                {library.map((book, index) => (
                    <Book book={book} />
                ))}
            </div>

        </div >
    );
}