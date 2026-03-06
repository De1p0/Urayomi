export interface SourceIds {
    [lang: string]: number;
}

export interface SourceConfig {
    name: string;
    langs: string[];
    ids: SourceIds;
    baseUrl: string;
    apiUrl: string;
    iconUrl: string;
    typeSource: string;
    itemType: number;
    version: string;
    pkgPath: string;
}

export interface Chapter {
    name: string;
    url: string;
    scanlator: string;
    dateUpload: string;
}

export interface Manga {
    name: string;
    imageUrl: string;
    link: string;
}


export interface MangaDetail {
    author: string;
    description: string;
    genre: string[];
    status: 0 | 1 | 2 | 3; // ongoing | completed | hiatus | cancelled
    chapters: Chapter[];
    imageUrl?: string;
}

export type TriState = 0 | 1 | 2;

export interface FilterStateOption {
    type_name: string;
    name: string;
    value?: string;
    state?: boolean | number;
    values?: FilterStateOption[];
}
export interface Filter {
    type_name: string;
    type?: string;
    name: string;
    state?: number | FilterStateOption[];
    values?: FilterStateOption[];
}
export interface ListPreference {
    title: string;
    summary: string;
    valueIndex: number;
    entries: string[];
    entryValues: string[];
}

export interface MultiSelectListPreference {
    title: string;
    summary: string;
    entries: string[];
    entryValues: string[];
    values: string[];
}

export interface EditTextPreference {
    title: string;
    summary: string;
    value: string;
    dialogTitle: string;
    dialogMessage: string;
}

export interface SourcePreference {
    key: string;
    listPreference?: ListPreference;
    multiSelectListPreference?: MultiSelectListPreference;
    editTextPreference?: EditTextPreference;
}

export interface PaginatedResponse<T> {
    data: T[];
    limit: number;
    total: number;
}

export interface MangaApiResponse {
    data: any[];
}

export interface ChapterApiResponse {
    data: any[];
    limit: number;
    total: number;
}

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
export type SourceResponse = {
    "id": string,
    "cover": string,
    "script": string
}

