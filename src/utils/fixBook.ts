import { useSourceRegistry } from '../stores/SourceStore';
import { DefaultExtension } from '../types/Extension';
import { LibraryManga, Manga } from '../types/Manga';

export async function fixBook(book: Manga | LibraryManga, sources: Record<string, DefaultExtension>) {
    const bookSource = book.source;
    if (!bookSource) return { ...book };
    if (bookSource == "Local") {
        return { ...book };
    }

    const source = sources[Object.keys(sources).find(
        s => s === bookSource
    ) || ""];

    console.log(sources);
    if (!source) return { ...book };
    return {
        ...book,
        source: source.source.name,
        getDetail: source.getDetail.bind(source)
    };
}

export function useFixBook() {
    const { sources } = useSourceRegistry();

    return (book: Manga | LibraryManga) => fixBook(book, sources);
}