import { useState, useEffect, useCallback, useMemo } from "react";
import { useConfigStore } from "../../../stores/ConfigStore";
import { MangaPage } from "./MangaPage";
import ProgressBar from "../ProgressBar";
import { useSourceRegistry } from "../../../stores/SourceStore";

export default function PageViewer() {
    const [pages, setPages] = useState<string[]>([]);
    const [pagesLoaded, setPagesLoaded] = useState(false);
    const { config, updateConfig } = useConfigStore();
    const { sources } = useSourceRegistry();


    const state = config.pageRoutes[config.currentPage].pageMangaState;

    const page = state.currentPage || 0;

    const chapter = state?.chapter?.currentChapter;
    const manga = state?.manga;

    const isLoaded =
        pages.length > 0 && page > -2 && pagesLoaded;

    const setPage = (newPage: number) => {

        updateConfig((config) => {
            config.pageRoutes[config.currentPage].pageMangaState.currentPage = newPage;
        });
    };


    function updatePage(index: number, fwd: boolean) {
        const chapterList = state?.chapterList;
        if (!chapterList) return;

        updateConfig((config) => {
            const pageState =
                config.pageRoutes[config.currentPage].pageMangaState;
            const chapter = chapterList[index];
            pageState.chapter ??= {
                currentChapter: chapter,
                currentPage: 0,
                pageList: [],
                pages: 0,
            };

            const isLastPage = page >= pages.length;
            const increment = config.layout.doublePanel ? 2 : 1;
            if (!isLastPage && fwd) {
                pageState.currentPage = (pageState.currentPage ?? 0) + increment;
                return;
            }

            if (isLastPage && fwd) {
                pageState.chapter.currentChapter = chapterList[index - 1];
                pageState.currentPage = 0;

                console.log(pageState.chapter.currentChapter)
                return;
            }

            const decrement = config.layout.doublePanel ? 2 : 1;
            const current = pageState.currentPage ?? 0;

            if (current > 0) {
                pageState.currentPage = Math.max(0, current - decrement);
                return;
            }


            if (index >= chapterList.length + 2) return;


            if (pageState.currentPage == -1) {
                pageState.currentPage = -2;
                pageState.chapter.currentChapter = chapterList[index + 1];

            } else pageState.currentPage = -1

            console.log(index, chapterList.length, pageState.currentPage)

        });

    }



    useEffect(() => {

        if (!chapter || !manga) return;


        const getPages = async () => {
            if (manga.source == "Local") {
                console.log("manga source is local")

                updateConfig((config) => {
                    const pageState =
                        config.pageRoutes[config.currentPage].pageMangaState;

                    console.log(pageState.currentPage, "ni")


                    pageState.chapter ??= {
                        currentChapter: chapter,
                        currentPage: 0,
                        pageList: [],
                        pages: 11,
                    };

                    pageState.chapter.pageList = ["fah", "fah", "fah", "fah", "fah", "fah", "fah"];
                    pageState.chapter.pages = pageState.chapter.pageList.length;
                    setPages([...pageState.chapter.pageList])


                    if (pageState.currentPage === -2) {
                        pageState.currentPage = Math.max(0, pageState.chapter.pageList.length - 1);
                    }
                });

                setPagesLoaded(true);
                return
            }


            const source = Object.values(sources).find(
                (s) => s.source.name === manga.source
            );
            if (!source) return;

            console.log(chapter)

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

                if (pageState.currentPage === -2) {
                    pageState.currentPage = Math.max(0, pageList.length - 1);
                }
            });

            setPagesLoaded(true);
        };



        getPages();
    }, [chapter?.url, manga, sources, updateConfig, page]);

    const handleNextPage = useCallback(() => {

        const chapterList = state?.chapterList;
        if (!chapterList?.length || !chapter) return;

        const index = chapterList.findIndex(
            (ch) => ch.name === chapter.name
        );
        if (index === -2) return;

        updatePage(index, true)

    }, [state, page, pages.length, config.layout.doublePanel, updateConfig]);

    const handlePrevPage = useCallback(() => {

        const chapterList = state?.chapterList;
        if (!chapterList?.length || !chapter) return;

        const index = chapterList.findIndex(
            (ch) => ch.name === chapter.name
        );
        if (index === -2) return;


        updatePage(index, false)
    }, [state, updateConfig, config.layout.doublePanel]);

    const isDouble = config.layout.doublePanel;

    const currentPageImg = pagesLoaded ? pages[page] || "" : "";
    const nextPageImg = pagesLoaded ? pages[page + 1] || "" : "";
    const chapterList = state?.chapterList;

    return (
        <div className="w-full h-full relative overflow-hidden flex flex-col bg-background">


            <div className="flex flex-1 bg-background overflow-auto">
                <div
                    className={`flex flex-1 gap-2 ${config.layout.rightToLeft ? "flex-row-reverse" : ""
                        } sm:gap-4 p-4 sm:p-8 items-center justify-center overflow-hidden bg-background rounded-bl-2xl ${isLoaded ? "cursor-pointer" : "cursor-wait"
                        }`}
                    onClick={(e) => {
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
                    {pages.length <= page || page == -1 ? <div
                        className={`max-h-full max-w-1/2 flex flex-col rounded-lg select-none text-primary-text gap-2`}
                    >

                        <span className="flex flex-col">
                            <strong>{page == -1 ? "Previous" : "Finished"}:</strong>

                            <span className="text-primary-text/70">
                                {(() => {

                                    if (page != -1) return chapter?.name
                                    if (!chapterList) return "";
                                    const index = chapterList?.findIndex(
                                        (ch) => ch.name === chapter?.name
                                    );
                                    return chapterList[index + 1]?.name
                                })()}
                            </span>
                        </span>

                        <span className="flex flex-col">
                            <strong>{page == -1 ? "Current" : "Next"}:</strong>

                            <span className="text-primary-text/70">
                                {(() => {
                                    if (page == -1) return chapter?.name;
                                    if (!chapterList) return "";
                                    const index = chapterList?.findIndex(
                                        (ch) => ch.name === chapter?.name
                                    );
                                    return chapterList[index - 1]?.name
                                })()}
                            </span>
                        </span>

                    </div > :


                        isDouble ? (
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
            </div >

            <div className="bg-surface px-4">
                <ProgressBar
                    page={page === -2 ? 0 : page}
                    total={pages.length}
                    onChange={(p) => {
                        setPage(p);
                    }}
                />
            </div>
        </div >
    );
}