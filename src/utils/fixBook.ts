import { useSourceRegistry } from '../stores/SourceStore';
import { DefaultExtension } from '../types/Extension';
import { LibraryManga, Manga } from '../types/Manga';

export async function fixBook(book: Manga | LibraryManga, sources: Record<string, DefaultExtension>): Promise<Manga> {
    const bookSource = book.source;
    if (!bookSource) return { ...book } as Manga;
    if (bookSource == "Local") {
        return { ...book } as Manga;
    }

    const source = sources[Object.keys(sources).find(
        s => s === bookSource
    ) || ""];

    console.log(sources);
    if (!source) return { ...book } as Manga;

    return {
        ...book,
        source: source.source.name,
        getDetail: source.getDetail.bind(source)
    } as Manga;
}

export function useFixBook() {
    const { sources } = useSourceRegistry();

    return (book: Manga | LibraryManga) => fixBook(book, sources);
}