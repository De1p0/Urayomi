import React from "react";
import BookDetailsPage from "../components/shared/BookDetails";
import Browse from "../pages/Browse";
import Library from "../pages/Library";
import Search from "../pages/Search";
import Settings from "../pages/Settings";
import { useConfigStore } from "../stores/ConfigStore";
import PageViewer from "../components/shared/reader/pageViewer";

const sharedRoutes = [
    { pattern: /\/books\//, component: <BookDetailsPage /> },
    { pattern: /\/read\//, component: <PageViewer /> },
]

const pageRegistry: Record<
    string,
    {
        default: React.ReactNode;
        routeOverrides?: { pattern: RegExp; component: React.ReactNode }[];
    }
> = {
    library: {
        default: <Library />,
        routeOverrides: sharedRoutes,
    },
    search: {
        default: <Search />,
        routeOverrides: sharedRoutes,
    },
    browse: { default: <Browse /> },
    settings: { default: <Settings /> },
};

const getPageComponent = (pageKey: string, route?: string) => {
    const pageConfig = pageRegistry[pageKey];

    if (!pageConfig) return <Library />;

    if (route && pageConfig.routeOverrides) {
        for (const override of pageConfig.routeOverrides) {
            if (override.pattern.test(route)) {
                return override.component;
            }
        }
    }

    return pageConfig.default;
};

export default function AnimatedRoutes() {
    const config = useConfigStore((state) => state.config);

    const CurrentComponent = getPageComponent(
        config.currentPage,
        config.pageRoutes[config.currentPage]?.route
    );

    return <div className="relative w-full h-full">{CurrentComponent}</div>;
}