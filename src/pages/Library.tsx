import { ArrowDownIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function Library() {
    // this is for test ONLY remove once library fn is fully implemented
    // image src will be cached offline until 12hr update
    const [open, setOpen] = useState(false);
    const [filter, setFilter] = useState("All")

    let library = [
    //     {
    //     name: "The Fragrant Flower Blooms with Dignity",
    //     imageSrc: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a5/Kaoru_Hana_wa_Rin_to_Saku_volume_1_cover.jpg/250px-Kaoru_Hana_wa_Rin_to_Saku_volume_1_cover.jpg",
    //     currentChapter: 12,
    //     maximumChapters: 333,
    // }, {
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
                    <div
                        key={index}
                        className="group relative w-full max-w-50 aspect-2/3 rounded-xl overflow-hidden shadow-2xl transition-transform"
                    >

                        {book.maximumChapters - book.currentChapter > 0 && (
                            <span className="absolute top-2 left-2 px-2 py-1 text-[10px] tracking-wider font-bold text-white bg-accent backdrop-blur-md rounded-md z-10">
                                {book.maximumChapters - book.currentChapter}
                            </span>
                        )}

                        <img
                            src={book.imageSrc}
                            className="w-full h-full object-cover"
                            alt={book.name}
                        />

                        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />

                        <span
                            className={`absolute bottom-0 left-0 p-3 text-sm text-white font-semibold leading-tight drop-shadow-md wrap-break-words ${book.name.length > 30
                                ? "max-w-full"
                                : "max-w-[75%]"
                                }`}
                        >
                            {book.name}
                        </span>
                    </div>
                ))}
            </div>

        </div >
    );
}