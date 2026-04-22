import { create } from "zustand";
import { DefaultExtension } from "../types/Extension";
import { persist } from "zustand/middleware";

export interface Source {
    name: string;
    getPageList: (url: string) => Promise<string[]>;
}

interface SourceRegistryStore {
    sources: Record<string, DefaultExtension>;
    setSource: (key: string, source: DefaultExtension) => void;
    removeSource: (key: string) => void;
}

export const useSourceRegistry = create<SourceRegistryStore>()(
    persist(
        (set) => ({
            sources: {},

            setSource: (key, source) =>
                set((state) => ({
                    sources: {
                        ...state.sources,
                        [key]: source,
                    },
                })),

            removeSource: (key) =>
                set((state) => {
                    const next = { ...state.sources };
                    delete next[key];
                    return { sources: next };
                }),
        }),
        {
            name: "source-storage",
        }
    )
);