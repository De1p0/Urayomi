import { DefaultExtension } from "../../types/Extension";
import { LibraryManga } from "../../types/Manga";
import { SourceConfig } from "../../types/Source";
import { fixBook } from "../../utils/fixBook";

test('should fix book with valid source', async () => {
    const mockSource = {
        source: {
            name: 'mangadex',
            langs: ['en'],
            ids: {},
            baseUrl: 'https://mangadex.org',
            apiUrl: 'https://api.mangadex.org',
            iconUrl: 'https://mangadex.org/icon.png',
            typeSource: 'manga',
            itemType: 1,
            version: '1.0.0',
            pkgPath: '/sources/mangadex.js',
        } as SourceConfig,
        getDetail: jest.fn().mockResolvedValue({
            author: 'Test Author',
            description: 'Test Description',
            genre: ['Action'],
            status: 0,
            chapters: [],
        }),
    } as unknown as DefaultExtension;

    const book: LibraryManga = {
        name: 'Test Manga',
        imageUrl: 'https://example.com/image.jpg',
        link: 'https://mangadex.com/manga/123',
        source: 'mangadex',
    };

    const result = await fixBook(book, { mangadex: mockSource });

    expect(result.source).toBe('mangadex');
    expect(result.getDetail).toBeDefined();
    expect(typeof result.getDetail).toBe('function');
    expect(result.name).toBe('Test Manga');
    expect(result.imageUrl).toBe('https://example.com/image.jpg');
});