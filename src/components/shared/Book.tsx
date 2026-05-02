import { useConfigStore } from "../../stores/ConfigStore";
import { useLibraryRegistry } from "../../stores/LibraryStore";
import { Manga } from "../../types/Manga";

export default function Book({ manga }: { manga: Manga }) {
    const { config, setPage, updateConfig } = useConfigStore()
    const { library, getBook } = useLibraryRegistry();

    console.log(library)

    return (<div


        onClick={() => {
            // config.pageRoutes[config.currentPage].state = book;
            setPage(config.currentPage, `/books/`, manga)

            updateConfig((config) => {
                const page = config.pageRoutes[config.currentPage];
                page.pageMangaState.manga = manga;
                console.log(manga, "kawaiii");

            })

        }}
        className="group relative w-full max-w-50 aspect-2/3 transition-all hover:opacity-80"
    >

        {/* {book.maximumChapters - book.currentChapter > 0 && (
            <span className="absolute top-2 left-2 px-2 py-1 text-[10px] tracking-wider font-bold text-white bg-accent backdrop-blur-md rounded-md z-10">
                {book.maximumChapters - book.currentChapter}
            </span>
        )} */}
        {library.map(q => q.link).includes(manga.link) && (<div className="w-full flex justify-end absolute py-1 px-2">
            <span className="px-2 py-1 text-[10px] tracking-wider font-bold text-white bg-accent backdrop-blur-md rounded-md z-10">
                {(getBook(manga?.link)?.chapters?.length || 0) - (getBook(manga?.link)?.chaptersRead?.length || 0)}
            </span>
        </div>)
        }
        < img
            src={manga?.imageUrl}
            className="w-full h-full object-cover rounded-xl"
            alt={manga?.name}
        />

        <div className="absolute inset-0 rounded-xl overflow-hidden bg-linear-to-t from-black/90 via-black/40 to-transparent" />

        <span
            className={`absolute bottom-0 left-0 p-3 text-sm text-white font-semibold leading-tight drop-shadow-md wrap-break-words ${manga?.name?.length > 30
                ? "max-w-full"
                : "max-w-[75%]"
                }`}
        >
            {manga?.name}
        </span>
    </div >)
}  