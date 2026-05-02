import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { LibraryManga } from "../types/Manga";

interface LibraryRegistryStore {
    library: LibraryManga[];
    addBook: (source: LibraryManga, remove?: boolean) => void;
    hasBook: (link: string) => boolean;
    getBook: (link: string) => LibraryManga | undefined;

    updateBook: (
        link: string,
        fn: (book: LibraryManga) => void
    ) => void;
}

export const useLibraryRegistry = create<LibraryRegistryStore>()(
    persist(
        immer((set, get) => ({
            library: [],

            addBook: (source, remove = false) => {
                set((state) => {
                    if (remove) {
                        state.library = state.library.filter(
                            (manga) => manga.link !== source.link
                        );
                    } else {
                        state.library.push(source);
                    }
                });
            },

            hasBook: (link) => {
                return get().library.some(
                    (manga) => manga?.link === link
                );
            },

            getBook: (link) => {
                return get().library.find(
                    (manga) => manga?.link === link
                );
            },

            updateBook: (link, fn) => {
                set((state) => {
                    const book = state.library.find(
                        (manga) => manga.link === link
                    );

                    if (book) {
                        fn(book);
                    }
                });
            },
        })),
        {
            name: "library-storage",
        }
    )
);



