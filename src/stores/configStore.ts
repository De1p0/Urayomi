import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DefaultExtension, SourceResponse, Manga } from '../types/ExtensionData';

export interface AppConfig {
    theme: 'system' | 'light' | 'dark';
    sources: SourceResponse[];
    sourceList: string;
    installedSourcesName: SourceResponse[];
    installedSources: DefaultExtension[];
    currentPage: PageName;
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
    searchResults: Manga[];
    searchQuery: string;
}

interface ConfigStore {
    config: AppConfig;
    setConfig: <K extends keyof AppConfig>(key: K, value: AppConfig[K]) => void;
    setPageRoute: (page: keyof AppConfig['pageRoutes'], path: string) => void;
    setSearch: (results: Manga[], query: string) => void;
    clearSearch: () => void;
}

export const useConfigStore = create<ConfigStore>()(
    persist(
        (set) => ({
            config: {
                theme: 'system',
                sources: [],
                pageRoutes: {
                    library: {
                        route: "/",
                        state: {}
                    },
                    search: {
                        route: "/",
                        state: {}
                    },
                    browse: {
                        route: "/",
                        state: {}
                    },
                    settings: {
                        route: "/",
                        state: {}
                    },
                },
                sourceList: "",
                currentPage: "library",
                installedSources: [],
                installedSourcesName: [],
                searchResults: [],
                searchQuery: "",
            },
            setConfig: (key, value) => {
                set((state) => ({
                    config: { ...state.config, [key]: value },
                }));

                if (key === 'theme') {
                    applyTheme(value as AppConfig['theme']);
                }
            },
            setPageRoute: (page, path) => {
                set((state) => ({
                    config: {
                        ...state.config,
                        pageRoutes: {
                            ...state.config.pageRoutes,
                            [page]: {
                                ...state.config.pageRoutes[page],
                                route: path,
                            },
                        },
                    },
                }));
            },
            setSearch: (results, query) => {
                set((state) => ({
                    config: { ...state.config, searchResults: results, searchQuery: query },
                }));
            },
            clearSearch: () => {
                set((state) => ({
                    config: { ...state.config, searchResults: [], searchQuery: "" },
                }));
            },
        }),
        { name: 'urayomi-settings' }
    )
);

export function applyTheme(theme: AppConfig['theme']) {
    if (typeof window === 'undefined') return;
    const isDark = theme === 'dark' ||
        (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.classList.toggle('dark', isDark);
}