type PageName = 'library' | 'search' | 'browse' | 'settings';

interface ConfigState {
    config: {
        currentPage: PageName;
        pageRoutes: {
            library: string;
            search: string;
            browse: string;
            settings: string;
        };
    };
}

