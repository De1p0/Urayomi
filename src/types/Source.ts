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
