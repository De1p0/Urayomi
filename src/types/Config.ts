import { ThemeName } from "../stores/themes/themes";
import { SourceResponse } from "./Api";
import { Chapter, Manga } from "./Manga";


export interface PageMangaChapterState {
    currentChapter?: Chapter;
    currentPage?: number;
    pageList?: string[]
    pages?: number;
}

export interface pageMangaState {
    manga?: Manga;
    chapterList?: Chapter[];
    currentPage?: number;
    chapter?: PageMangaChapterState;
}

// export interface State {

// }

export interface pageConfig {
    route: string;
    pageMangaState: pageMangaState
};

export interface PageRoutes {
    library: pageConfig,
    search: pageConfig,
    browse: pageConfig,
    settings: pageConfig,
};

export interface AppConfig {
    layout: {
        doublePanel: boolean;
        rightToLeft: boolean;
    };
    theme: ThemeName;
    sources: SourceResponse[];
    sourceList: string;
    installedSourcesName: SourceResponse[];
    currentPage: keyof PageRoutes;
    isMobile: boolean;
    pageRoutes: PageRoutes
    searchResults: { [key: string]: Manga[] };
    searchQuery: string;
}

export interface ConfigStore {
    config: AppConfig;

    updateConfig: (fn: (config: AppConfig) => void) => void;

    setTheme: (theme: ThemeName) => void;
    setPage: (
        page: keyof AppConfig['pageRoutes'],
        path: string,
        state: unknown
    ) => void;
    clearSearch: () => void;
}