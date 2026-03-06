import React from "react";
import BookDetailsPage from "../components/shared/BookDetails";
import Browse from "../pages/Browse";
import Library from "../pages/Library";
import Search from "../pages/Search";
import Settings from "../pages/Settings";
import { useConfigStore } from "../stores/configStore";

export default function AnimatedRoutes() {
    const config = useConfigStore((state) => state.config);

    const renderContent = (
        DefaultComponent: React.ComponentType
    ): React.ReactNode => {
        console.log(config.currentPage, config.pageRoutes)


        if (config.pageRoutes[config.currentPage]?.route?.includes('/books/')) {
            return <BookDetailsPage />;
        }
        return <DefaultComponent />;
    };



    return (
        <div className="relative w-full h-full">
            <div className={config.currentPage === 'library' ? 'block h-full' : 'hidden'}>
                {renderContent(Library)}
            </div>

            <div className={config.currentPage === 'search' ? 'block h-full' : 'hidden'}>
                {renderContent(Search)}
            </div>

            <div className={config.currentPage === 'browse' ? 'block h-full' : 'hidden'}>
                {renderContent(Browse)}
            </div>

            <div className={config.currentPage === 'settings' ? 'block h-full' : 'hidden'}>
                {renderContent(Settings)}
            </div>
        </div>
    );
}