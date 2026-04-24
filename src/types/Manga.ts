
export interface Chapter {
    name: string;
    url: string;
    scanlator: string;
    dateUpload: string;
}

export interface Manga {
    getDetail: (url: string) => Promise<MangaDetail>;
    name: string;
    imageUrl: string;
    link: string;
    source: string,
}


export interface MangaDetail {
    author: string;
    description: string;
    genre: string[];
    status: 0 | 1 | 2 | 3; // ongoing | completed | hiatus | cancelled
    chapters: Chapter[];
    imageUrl?: string;
}

export interface LibraryManga {
    name: string,
    imageUrl: string,
    link?: string,
    source: string,
    chapters?: Chapter[]
}
