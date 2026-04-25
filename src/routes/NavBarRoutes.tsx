
import { useConfigStore } from "../stores/ConfigStore";
import Searchbar from "../components/layout/SearchBar";

// put components here and move to files later                   

export function ChapterTitle() {
    const { config } = useConfigStore();

    // <div className="absolute w-full h-12 flex items-center justify-end px-6 text-primary-text">
    //     <span
    //         className="px-4 py-1.5 bg-surface/50 border border-primary-text/10 truncate max-w-1/4 rounded text-xs font-semibold"
    //         title={chapter?.name}
    //     >
    //         {chapter?.name || "Loading..."}        
    //     </span>
    // </div>

    return (<div className="bg-surface/50 px-4 flex flex-col items-center rounded font-black">
        <span className="text-xs ">
            {config.pageRoutes[config.currentPage].pageMangaState.manga?.name}

        </span>
        <span className="text-xs font-thin">
            {config.pageRoutes[config.currentPage].pageMangaState.chapter?.currentChapter?.name}

        </span>
    </div>)
}

export function Nothing() {
    return (<Searchbar />)
}

const sharedRoutes = [
    { pattern: /\/read\//, component: <ChapterTitle /> },
]

const pageRegistry: Record<
    string,
    {
        default: React.ReactNode;
        routeOverrides?: { pattern: RegExp; component: React.ReactNode }[];
    }
> = {
    library: {
        default: <Nothing />,
        routeOverrides: sharedRoutes,
    },
    search: {
        default: <Nothing />,
        routeOverrides: sharedRoutes,
    },
    browse: { default: <Nothing /> },
    settings: { default: <Nothing /> },
};

const getPageComponent = (pageKey: string, route?: string) => {
    const pageConfig = pageRegistry[pageKey];

    if (!pageConfig) return <Nothing />;

    if (route && pageConfig.routeOverrides) {
        for (const override of pageConfig.routeOverrides) {
            if (override.pattern.test(route)) {
                return override.component;
            }
        }
    }
    return pageConfig.default;
};

export default function NavBarRoutes() {
    const { config } = useConfigStore();

    const CurrentComponent = getPageComponent(
        config.currentPage,
        config.pageRoutes[config.currentPage]?.route,
    );

    return <>{CurrentComponent}</>;
}