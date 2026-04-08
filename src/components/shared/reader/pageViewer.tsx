import { useState, useEffect, useRef, useCallback } from "react";
import { useConfigStore } from "../../../stores/configStore";
import { fixBook } from "../../../utils/fixBook";
import ProgressBar from "../ProgressBar";
import { MangaPage } from "./MangaPage";
import { MangaDetail } from "../../../types/Manga";

interface PageCache {
    [chapterIndex: number]: string[];
}

export default function PageViewer() {
    const { config } = useConfigStore();
    const [page, setPage] = useState(0);
    const [chapterIndex, setChapterIndex] = useState(0);
    const [pages, setPages] = useState<string[]>([]);
    const [pageCache, setPageCache] = useState<PageCache>({});
    const [mangaDetail, setMangaDetail] = useState({} as MangaDetail);
    const [displayImgs, setDisplayImgs] = useState<(string | null)[]>([]);

    const mangaChapter = config.pageRoutes[config.currentPage]?.state;
    const manga = mangaChapter?.manga;

    useEffect(() => {
        if (!manga || !config.installedSources?.length) return;
        const getDetail = async () => {
            try {
                const fixedBook = await fixBook(manga, config);
                const detail = fixedBook.getDetail
                    ? await fixedBook.getDetail(fixedBook.link)
                    : fixedBook;
                setMangaDetail(detail);
            } catch (error) {
                console.error("Error fetching manga detail:", error);
            }
        };
        getDetail();
    }, [manga, config]);

    useEffect(() => {
        if (!mangaDetail?.chapters || !mangaChapter?.chapter) return;
        const index = mangaDetail.chapters.findIndex(
            (ch) => ch.name === mangaChapter.chapter.name
        );
        setChapterIndex(Math.max(0, index));
    }, [mangaDetail, mangaChapter]);

    useEffect(() => {
        if (!mangaChapter || !config.installedSources) return;

        const getPages = async () => {
            const source = config.installedSources.find(
                (s) => s.source.name === mangaChapter.manga.source
            );
            if (!source) return;

            if (pageCache[chapterIndex]) {
                setPages(pageCache[chapterIndex]);
                return;
            }

            const pageList = await source.getPageList(mangaChapter.chapter.url);
            setPages(pageList);
            setPageCache((prev) => ({ ...prev, [chapterIndex]: pageList }));
            setPage(0);
        };

        getPages();
    }, [mangaChapter, config.installedSources, chapterIndex]);

    useEffect(() => {
        if (!pages.length) return;

        const preloadCount = 3;
        const newDisplayImgs: (string | null)[] = [...displayImgs];

        const preloadImage = (src: string, index: number) => {
            const img = new Image();
            img.src = src;
            img.decode?.().catch(() => { });
            img.onload = () => {
                setDisplayImgs((prev) => {
                    const copy = [...prev];
                    copy[index] = src;
                    return copy;
                });
            };
        };

        for (let i = page; i <= page + preloadCount && i < pages.length; i++) {
            if (!newDisplayImgs[i]) newDisplayImgs[i] = null;
            preloadImage(pages[i], i);
        }
        setDisplayImgs(newDisplayImgs);
    }, [page, pages]);



    const handleNextPage = useCallback(() => {
        setPage((p) => p + (config.layout.doublePanel ? 2 : 1));
    }, [config.layout.doublePanel]);

    const handlePrevPage = useCallback(() => {
        setPage((p) => p - (config.layout.doublePanel ? 2 : 1));
    }, [config.layout.doublePanel]);

    const isSinglePageLayout = config.layout.doublePanel;
    const currentPageImg = displayImgs[page] || pages[page];
    const nextPageImg = displayImgs[page + 1] || pages[page + 1];

    return (
        <div className="w-full h-full overflow-hidden flex flex-col bg-background">

            <div className="flex flex-1 bg-surface overflow-auto">
                <div
                    className={`flex flex-1 gap-2 ${config.layout.rightToLeft ? "flex-row-reverse" : ""} sm:gap-4 p-4 sm:p-8 items-center justify-center overflow-hidden bg-background rounded-bl-2xl`}
                    onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const clickX = e.clientX - rect.left;
                        const isLeft = clickX < rect.width / 2;

                        if (config.layout.rightToLeft) {
                            if (isLeft) {
                                handleNextPage();
                            } else {
                                handlePrevPage();
                            }
                        } else {
                            if (isLeft) {
                                handlePrevPage();
                            } else {
                                handleNextPage();
                            }
                        }
                    }}
                >
                    {isSinglePageLayout ? (
                        <>
                            <MangaPage
                                src={currentPageImg}
                                alt={`Page ${page + 1}`}
                                half
                                fallback={
                                    <div className="text-center text-sm text-neutral-500">
                                        No pages available
                                    </div>
                                }
                            />

                            <MangaPage
                                src={nextPageImg}
                                alt={`Page ${page + 2}`}
                                half
                                fallback={
                                    <div className="text-center text-sm text-primary-text/50 mb-2">
                                        Next Chapter
                                    </div>
                                }
                            />
                        </>
                    ) : (
                        <MangaPage
                            src={currentPageImg}
                            alt={`Page ${page + 1}`}
                        />
                    )}
                </div>
            </div>


            <div className="bg-surface px-4 ">
                <ProgressBar
                    page={page}
                    total={pages.length}
                    onChange={setPage}
                />
            </div>
        </div>
    );
}