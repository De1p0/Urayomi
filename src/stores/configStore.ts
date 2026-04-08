import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ThemeName, THEMES } from './themes/themes';
import { platform } from '@tauri-apps/plugin-os';
import { AppConfig, ConfigStore } from '../types/Config';

const current_platform: string = platform()
const isMobile = current_platform === "ios" || current_platform === "android";


export const useConfigStore = create<ConfigStore>()(
    persist(
        (set) => ({
            config: {
                layout: {
                    doublePanel: !isMobile,
                    rightToLeft: true,
                },
                isMobile: isMobile,
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
                searchResults: {},
                searchQuery: "",
            },
            setLayoutKey: (key, value) => {
                set((state) => ({
                    config: {
                        ...state.config,
                        layout: {
                            ...state.config.layout,
                            [key]: value,
                        },
                    },
                }));
            },
            setConfig: (key, value) => {
                set((state) => ({
                    config: { ...state.config, [key]: value },
                }));

                if (key === 'theme') {
                    applyTheme(value as AppConfig['theme']);
                }
            },
            setPageState: (page, stateValue) => {
                set((state) => ({
                    config: {
                        ...state.config,
                        pageRoutes: {
                            ...state.config.pageRoutes,
                            [page]: {
                                ...state.config.pageRoutes[page],
                                state: stateValue,
                            },
                        },
                    },
                }));
            },
            setPage: (page, path, stateValue) => {
                set((store) => ({
                    config: {
                        ...store.config,
                        currentPage: page,
                        pageRoutes: {
                            ...store.config.pageRoutes,
                            [page]: {
                                ...store.config.pageRoutes[page],
                                route: path,
                                state: stateValue,
                            },
                        },
                    },
                }));
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
                    config: { ...state.config, searchResults: {}, searchQuery: "" },
                }));
            },
        }),
        { name: 'urayomi-settings' }
    )
);

export function applyTheme(theme: ThemeName) {
    if (typeof window === "undefined") return;

    const root = document.documentElement;

    const isSystemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    const resolved =
        theme === "system"
            ? isSystemDark
                ? "dark"
                : "light"
            : theme;

    Object.values(THEMES).forEach((t) => {
        if (t.class) root.classList.remove(t.class);
    });

    const themeClass = THEMES[resolved].class;
    if (themeClass) root.classList.add(themeClass);
}