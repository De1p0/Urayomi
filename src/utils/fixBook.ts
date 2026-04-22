import { useSourceRegistry } from '../stores/SourceStore';

export async function fixBook(book: any, sources: Record<string, any>) {
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

    return (book: any) => fixBook(book, sources);
}