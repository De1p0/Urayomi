import { ThemeName } from "../stores/themes/themes";
import { SourceResponse } from "./Api";
import { DefaultExtension } from "./Extension";
import { Manga } from "./Manga";

export interface AppConfig {
    layout: {
        doublePanel: boolean;
        rightToLeft: boolean;
    };
    theme: ThemeName;
    sources: SourceResponse[];
    sourceList: string;
    installedSourcesName: SourceResponse[];
    installedSources: DefaultExtension[];
    currentPage: PageName;
    isMobile: boolean;
    pageRoutes: {
        library: {
            route: string;
            state: any
        };
        search: {
            route: string;
            state: any
        };
        browse: {
            route: string;
            state: any
        };
        settings: {
            route: string;
            state: any
        };
    };
    searchResults: { [key: string]: Manga[] };
    searchQuery: string;
}

export interface ConfigStore {
    config: AppConfig;
    setConfig: <K extends keyof AppConfig>(key: K, value: AppConfig[K]) => void;
    setLayoutKey: <K extends keyof AppConfig['layout']>(
        key: K,
        value: AppConfig['layout'][K]
    ) => void;
    setPageRoute: (page: keyof AppConfig['pageRoutes'], path: string) => void;
    setSearch: (results: { [key: string]: Manga[] }, query: string) => void;
    setPageState: (page: keyof AppConfig['pageRoutes'], state: any) => void;
    setPage: (page: keyof AppConfig['pageRoutes'], path: string, state: any) => void;
    clearSearch: () => void;
}