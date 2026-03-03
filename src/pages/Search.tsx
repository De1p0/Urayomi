import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Search() {
    const location = useLocation();
    const { results, query } = location.state || { results: [], query: "" };

    useEffect(() => {
    console.log(results, query)

    }, [])

    return (
     <div className="w-full h-full p-8">
            <header className="mb-6">
                <h1 className="text-2xl font-bold text-primary-text tracking-tight">
                        Results for "{query}"

                </h1>
            </header>

            {results.map((item: any, index: number) => (
                <div key={index}>
                    {item.title}
                </div>
            ))}


            <div className="overflow-y-auto flex flex-wrap gap-5 content-start">

                {results.map((book, index) => (
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
                            src={book.imageUrl}
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

        </div>
    );
}

