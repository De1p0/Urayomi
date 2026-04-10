import { useState, useEffect, useCallback, useMemo } from "react";
import { useConfigStore } from "../../../stores/configStore";
import { MangaPage } from "./MangaPage";
import ProgressBar from "../ProgressBar";
import { useSourceRegistry } from "../../../stores/SourceStore";

export default function PageViewer() {
    const [pages, setPages] = useState<string[]>([]);
    const { config, updateConfig } = useConfigStore();
    const { sources } = useSourceRegistry();

    const state = config.pageRoutes[config.currentPage].pageMangaState;

    const page = state?.currentPage || 0;

    const chapter = state?.chapter?.currentChapter;
    const manga = state?.manga;

    const isLoaded =
        pages.length > 0 && page > -1;

    const setPage = (newPage: number) => {
        if (!isLoaded) return;

        updateConfig((config) => {
            config.pageRoutes[config.currentPage].pageMangaState.currentPage = newPage;
        });
    };

    useEffect(() => {
        if (!chapter || !manga || !sources || Object.keys(sources).length === 0) return;

        const getPages = async () => {
            const source = Object.values(sources).find(
                (s) => s.source.name === manga.source
            );
            if (!source) return;

            try {
                const pageList = await source.getPageList(chapter.url);
                setPages(pageList);

                updateConfig((config) => {
                    const pageState =
                        config.pageRoutes[config.currentPage].pageMangaState;

                    pageState.chapter ??= {
                        currentChapter: chapter,
                        currentPage: 0,
                        pageList: [],
                        pages: 0,
                    };

                    pageState.chapter.pageList = pageList;
                    pageState.chapter.pages = pageList.length;

                    if (pageState.currentPage === -1) {
                        pageState.currentPage = Math.max(0, pageList.length - 1);
                    }
                });
            } catch (e) {
                console.error(e);
            }
        };

        getPages();
    }, [chapter?.url, manga, sources, updateConfig]);

    const handleNextPage = useCallback(() => {
        if (!isLoaded) return;

        const chapterList = state?.chapterList;
        if (!chapterList?.length || !chapter) return;

        const index = chapterList.findIndex(
            (ch) => ch.name === chapter.name
        );
        if (index === -1) return;

        const isLastPage = page >= pages.length - 1;
        const increment = config.layout.doublePanel ? 2 : 1;

        updateConfig((config) => {
            const pageState =
                config.pageRoutes[config.currentPage].pageMangaState;

            if (!isLastPage) {
                pageState.currentPage = (pageState.currentPage ?? 0) + increment;
                return;
            }

            const nextIndex = index - 1;
            if (nextIndex < 0) return;

            const nextChapter = chapterList[nextIndex];

            pageState.chapter ??= {
                currentChapter: nextChapter,
                currentPage: 0,
                pageList: [],
                pages: 0,
            };

            pageState.chapter.currentChapter = nextChapter;
            pageState.currentPage = 0;
        });
    }, [isLoaded, state, page, pages.length, config.layout.doublePanel, updateConfig]);

    const handlePrevPage = useCallback(() => {
        if (!isLoaded) return;

        const chapterList = state?.chapterList;
        if (!chapterList?.length || !chapter) return;

        const index = chapterList.findIndex(
            (ch) => ch.name === chapter.name
        );
        if (index === -1) return;

        updateConfig((config) => {
            const pageState =
                config.pageRoutes[config.currentPage].pageMangaState;

            const decrement = config.layout.doublePanel ? 2 : 1;
            const current = pageState.currentPage ?? 0;

            if (current > 0) {
                pageState.currentPage = Math.max(0, current - decrement);
                return;
            }

            const prevIndex = index + 1;
            if (prevIndex >= chapterList.length) return;

            const prevChapter = chapterList[prevIndex];

            pageState.chapter ??= {
                currentChapter: prevChapter,
                currentPage: -1,
                pageList: [],
                pages: 0,
            };

            pageState.chapter.currentChapter = prevChapter;
            pageState.currentPage = -1;
        });
    }, [isLoaded, state, updateConfig, config.layout.doublePanel]);

    const isDouble = config.layout.doublePanel;

    const currentPageImg = pages[page] || "";
    const nextPageImg = pages[page + 1] || "";

    return (
        <div className="w-full h-full overflow-hidden flex flex-col bg-background">
            <div className="flex flex-1 bg-surface overflow-auto">
                <div
                    className={`flex flex-1 gap-2 ${config.layout.rightToLeft ? "flex-row-reverse" : ""
                        } sm:gap-4 p-4 sm:p-8 items-center justify-center overflow-hidden bg-background rounded-bl-2xl ${isLoaded ? "cursor-pointer" : "pointer-events-none opacity-50"
                        }`}
                    onClick={(e) => {
                        if (!isLoaded) return;

                        const rect = e.currentTarget.getBoundingClientRect();
                        const isLeft =
                            e.clientX - rect.left < rect.width / 2;

                        if (config.layout.rightToLeft) {
                            isLeft ? handleNextPage() : handlePrevPage();
                        } else {
                            isLeft ? handlePrevPage() : handleNextPage();
                        }
                    }}
                >
                    {isDouble ? (
                        <>
                            <MangaPage
                                src={currentPageImg}
                                alt={`Page ${page + 1}`}
                                half
                            />
                            {nextPageImg && (
                                <MangaPage
                                    src={nextPageImg}
                                    alt={`Page ${page + 2}`}
                                    half
                                />
                            )}
                        </>
                    ) : (
                        <MangaPage
                            src={currentPageImg}
                            alt={`Page ${page + 1}`}
                        />
                    )}
                </div>
            </div>

            <div className="bg-surface px-4">
                <div className="flex justify-between items-center text-sm text-primary-text/80 pb-2">
                    <div>
                        Chapter: {state?.chapter?.currentChapter?.name ?? "—"}
                    </div>
                    <div>
                        Page {pages.length ? Math.min(page + 1, pages.length) : 0} /{" "}
                        {pages.length}
                    </div>
                </div>

                <ProgressBar
                    page={page === -1 ? 0 : page}
                    total={pages.length}
                    onChange={(p) => {
                        if (!isLoaded) return;
                        setPage(p);
                    }}
                />
            </div>
        </div>
    );
}