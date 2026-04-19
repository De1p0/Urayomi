import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { ThemeName, THEMES } from './themes/themes';
import { platform } from '@tauri-apps/plugin-os';
import { AppConfig, ConfigStore } from '../types/Config';

const current_platform: string = platform();
const isMobile = current_platform === "ios" || current_platform === "android";

export const useConfigStore = create<ConfigStore>()(
    persist(
        immer((set) => ({
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
                        state: {},
                        pageMangaState: {}
                    },
                    search: {
                        route: "/",
                        state: {},
                        pageMangaState: {}
                    },
                    browse: {
                        route: "/",
                        state: {},
                        pageMangaState: {}
                    },
                    settings: {
                        route: "/",
                        state: {},
                        pageMangaState: {}
                    },
                },
                sourceList: "",
                currentPage: "library",
                installedSources: [],
                installedSourcesName: [],
                searchResults: {},
                searchQuery: "",
            },

            updateConfig: (fn: (config: AppConfig) => void) => {
                set((state) => {
                    fn(state.config);
                });
            },

            setTheme: (theme: ThemeName) => {
                set((state) => {
                    state.config.theme = theme;
                });

                applyTheme(theme);
            },

            setPage: (page, path, stateValue) => {
                set((state) => {
                    state.config.currentPage = page;
                    state.config.pageRoutes[page].route = path;
                    state.config.pageRoutes[page].state = stateValue;
                });
            },

            clearSearch: () => {
                set((state) => {
                    state.config.searchResults = {};
                    state.config.searchQuery = "";
                });
            },
        })),
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