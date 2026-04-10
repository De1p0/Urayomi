import { useSourceRegistry } from '../stores/SourceStore';
import { useConfigStore } from '../stores/configStore';
import { AppConfig } from '../types/Config';

export async function fixBook(book: any, sources: Record<string, any>) {
    const bookSource = book.source?.toLowerCase();
    if (!bookSource) return { ...book };

    const source = sources[Object.keys(sources).find(
        s => s.toLowerCase() === bookSource
    ) || ""];

    if (!source) return { ...book };
    console.log(book)
    return {
        ...book,
        source: source.source.name,
        getDetail: source.getDetail.bind(source)
    };
}

export function useFixBook() {
    const { sources } = useSourceRegistry();

    return (book: any) => fixBook(book, sources);
}