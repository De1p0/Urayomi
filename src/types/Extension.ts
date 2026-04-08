import { Filter } from "./Filters";
import { Manga, MangaDetail, Chapter } from "./Manga";
import { SourcePreference } from "./Preference";
import { SourceConfig } from "./Source";

export declare class DefaultExtension {
    source: SourceConfig;

    constructor(source?: SourceConfig);

    fetchUrl(url: string): Promise<any>;
    getHeaders(url: string): Record<string, string>;
    getPopular(page: number): Promise<{ list: Manga[]; hasNextPage: boolean }>;
    getLatestUpdates(page: number): Promise<{ list: Manga[]; hasNextPage: boolean }>;
    search(query: string, page: number, filters: Filter[]): Promise<{ list: Manga[]; hasNextPage: boolean }>;
    getDetail(url: string): Promise<MangaDetail>;
    fetchPaginatedChapters(mangaId: string, lang: string): Promise<Chapter[]>;
    extractChapters(paginatedData: any): Chapter[];
    getPageList(url: string): Promise<string[]>;
    getFilterList(): Filter[];
    mangaRes(res: string): { list: Manga[]; hasNextPage: boolean };
    findTitle(data: any, lang: string): string;
    getCover(data: any): string;
    preferenceOriginalLanguages(): string;
    getPreference<T>(key: string, defaultValue: T): T;
    ll(url: string): string;
    getSourcePreferences(): SourcePreference[];
}

