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
export type SourceResponse = {
    id: string,
    cover: string,
    script: string
}

