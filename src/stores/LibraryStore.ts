import { create } from "zustand";
import { LibraryManga } from "../types/Manga";

interface LibraryRegistryStore {
    library: LibraryManga[];
    addBook: (source: LibraryManga, remove?: boolean) => void;
    hasBook: (source: LibraryManga) => boolean;
}

export const useLibraryRegistry = create<LibraryRegistryStore>((set, get) => ({
    library: [],

    addBook: (source, remove = false) => {
        set((state) => {
            if (remove) {
                return {
                    library: state.library.filter(
                        (manga) => manga.link !== source.link
                    ),
                };
            }

            return {
                library: [...state.library, source],
            };
        });
    },

    hasBook: (source) => {
        return get().library.some(
            (manga) => manga.link === source.link
        );
    },
}));

