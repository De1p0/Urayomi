import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { useConfigStore } from "../../stores/ConfigStore";
import { useFixBook } from "../../utils/fixBook";
import { Manga, MangaDetail } from "../../types/Manga";
import { useSourceRegistry } from "../../stores/SourceStore";
import { BookmarkIcon } from "@heroicons/react/24/outline";
import { useLibraryRegistry } from "../../stores/LibraryStore";


export default function BookDetailsPage() {
    const { config, setPage, updateConfig } = useConfigStore();
    const { sources } = useSourceRegistry();
    const [mangaDetail, setMangaDetail] = useState({} as MangaDetail);
    const [descriptionExp, setDescExp] = useState(false);
    const [genreExp, setGenreExp] = useState(false);
    const description = mangaDetail.description || "";
    const manga = config.pageRoutes[config.currentPage].pageMangaState.manga!;
    const fixBook = useFixBook();

    const { hasBook, addBook, getBook } = useLibraryRegistry();
    useEffect(() => {
        const getDetail = async () => {
            console.log(sources, "source")

            if (manga?.getDetail) {
                const detail = await manga.getDetail(manga.link);
                setMangaDetail(detail);
            } else {
                const fixedBook = await fixBook(manga) as Manga;

                const detail = await fixedBook.getDetail(fixedBook.link);
                setMangaDetail(detail);
            }


        };
        getDetail();
    }, [manga, sources]);

    useEffect(() => {
        updateConfig((config) => {
            config.pageRoutes[config.currentPage].pageMangaState.chapterList = mangaDetail.chapters;
            console.log(mangaDetail)
            config.pageRoutes[config.currentPage].pageMangaState.manga = manga;
        })

    }, [mangaDetail])

    return (
        <div className="p-4 sm:p-8 w-full h-full text-primary-text overflow-y-auto">

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-10">


                <div className="shrink-0 sm:sticky sm:top-0 flex flex-col gap-5">
                    <img
                        src={manga?.imageUrl}
                        alt={manga?.name}
                        className="w-44 sm:w-72 object-cover aspect-2/3 rounded-xl"
                    />

                    <button
                        onClick={() => addBook({ ...manga, chapters: mangaDetail.chapters, chaptersRead: [] }, hasBook(manga.link))}
                        className={`w-full h-10 transition-all ${hasBook(manga.link) ? "bg-accent/80" : "bg-surface/80"} py-1.5 px-3 rounded-lg text-xs font-semibold text-primary-text/70 flex items-center justify-center`} >

                        <div className="flex flex-row items-center justify-center gap-2 leading-none">
                            <BookmarkIcon className="w-4 h-4" />
                            <span>{hasBook(manga.link) ? "Remove from library" : "Add to library"}</span>
                        </div>

                    </button>
                </div>

                <div className="flex-1 min-w-0 w-full">
                    <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-center sm:text-left">
                        {manga?.name}
                    </h1>

                    <div className="flex flex-row flex-wrap w-full gap-2 mt-4 sm:mt-6 items-center justify-center sm:justify-start">
                        {mangaDetail?.genre?.slice(0, genreExp ? undefined : 5).map((genre) => (
                            <div
                                key={genre}
                                className="shrink-0 bg-surface/80 py-1.5 px-3 rounded-lg text-xs font-semibold text-primary-text/70"
                            >
                                {genre}
                            </div>
                        ))}

                        {mangaDetail?.genre?.length > 5 && (
                            <button
                                onClick={() => setGenreExp(!genreExp)}
                                className="shrink-0 bg-accent/10 text-accent/80 px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                            >
                                {genreExp ? "Show less" : `+${mangaDetail.genre.length - 5} more`}
                            </button>
                        )}
                    </div>

                    {/* <button
                        onClick={() => {
                            MangaManager.add(manga?.name, mangaDetail.description, mangaDetail.genre);
                            MangaManager.saveCover(manga?.name, coverImg);
                        }}
                        className=""
                    >
                        fuck you
                    </button> */}

                    <div className="mt-5 sm:mt-6 max-w-3xl">
                        <div className={`text-sm sm:text-md leading-relaxed text-primary-text/60 ${descriptionExp ? "" : "line-clamp-3"}`}>
                            <ReactMarkdown>
                                {description}
                            </ReactMarkdown>
                        </div>

                        {description && (
                            <button
                                onClick={() => setDescExp(!descriptionExp)}
                                className="mt-2 text-accent text-sm font-medium cursor-pointer hover:underline"
                            >
                                {descriptionExp ? "Read less" : "Read full description"}
                            </button>
                        )}
                    </div>

                    <hr className="my-6 sm:my-8 border-primary-text/5" />

                    <div className="mt-2">
                        <h2 className="text-xl sm:text-2xl font-bold mb-4">Chapters</h2>
                        <div className="grid grid-cols-1">
                            {config.pageRoutes[config.currentPage].pageMangaState.chapterList?.map((chapter, index) => (
                                <div
                                    key={index}
                                    onClick={() => {
                                        setPage(config.currentPage, `/read/`, { chapter, manga })
                                        updateConfig((config) => {
                                            // config.pageRoutes[config.currentPage].pageMangaState.chapter.currentChapter = chapter;
                                            const page = config.pageRoutes[config.currentPage];
                                            console.log("so get away ", page.pageMangaState.chapter)
                                            console.log(chapter)
                                            page.pageMangaState.chapter ??= {};
                                            page.pageMangaState.manga = manga;
                                            page.pageMangaState.chapter.currentChapter = chapter;

                                        })
                                        updateConfig((config) => {
                                            const pageState =
                                                config.pageRoutes[config.currentPage].pageMangaState;
                                            pageState.currentPage = 0;

                                        })
                                    }}
                                    className={`${getBook(manga.link)?.chaptersRead?.includes(chapter.url) && "opacity-50"} 
                                        text-primary-text/70 group flex items-center justify-between py-4 px-2 sm:p-4 border-b border-primary-text/5 hover:bg-surface active:bg-surface transition-all cursor-pointer`}
                                >
                                    <span
                                        className="font-medium transition-all duration-200 flex flex-col gap-0.5"
                                    >
                                        <span className="text-sm sm:text-base">{chapter.name}</span>
                                        <span className="text-xs text-primary-text/50 transition-all duration-200">
                                            {`${(() => {
                                                const date = new Date(+chapter.dateUpload);
                                                return date.toLocaleDateString("en-US", {
                                                    month: "short",
                                                    day: "numeric",
                                                    year: "numeric",
                                                });
                                            })()}   •   ${chapter.scanlator}`}
                                        </span>
                                    </span>
                                </div>
                            ))}
                        </div>

                        {!mangaDetail.chapters && (
                            <div className="animate-pulse text-primary-text/20">Loading chapters...</div>
                        )}
                    </div>
                </div>
            </div>
        </div >
    );
}