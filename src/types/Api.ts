export interface PaginatedResponse<T> {
    data: T[];
    limit: number;
    total: number;
}


export type SourceResponse = {
    // id: string,
    // cover: string,
    // script: string,
    // lang: string,
    // id: number;
    // name: string;
    // lang: string;
    // baseUrl: string;
    // apiUrl: string;
    // iconUrl: string;
    // typeSource: "single" | "multi" | string;
    // itemType: number;
    // version: string;
    // pkgPath: string;
    name: string;
    id: number;
    baseUrl: string;
    lang: string;

    typeSource: "madara" | string;

    iconUrl: string;

    dateFormat: string;
    dateFormatLocale: string;

    isNsfw: boolean;
    hasCloudflare: boolean;

    sourceCodeUrl: string;

    apiUrl: string;

    version: string;

    isManga: boolean;
    itemType: number;
    isFullData: boolean;

    appMinVerReq: string;

    additionalParams: string;

    sourceCodeLanguage: number;

    notes: string;
}

