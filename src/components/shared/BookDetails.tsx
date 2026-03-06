import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Manga } from "../../types/ExtensionData";
import { ArrowLeftCircleIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useConfigStore } from "../../stores/configStore";

export default function BookDetailsPage() {
    const location = useLocation();
    const { config, setPageRoute } = useConfigStore()

    const manga = config.pageRoutes[config.currentPage].state

    console.log(config.pageRoutes[config.currentPage], config.currentPage)

    return (
        <div className="p-8 w-full h-full text-primary-text">
            <button
                onClick={() => setPageRoute(config.currentPage, "/")}
                className="flex items-center gap-2 text-sm text-primary-text/60 hover:text-accent transition-colors mb-4"
            >
                <ArrowLeftIcon width={16} />
                Back
            </button>
            <div className="flex gap-8 mt-4 ">
                <img src={manga?.imageUrl} className="w-64 rounded-xl" />
                <div>
                    <h1 className="text-4xl font-bold">{manga?.name}</h1>
                    <p className="mt-4 opacity-70">
                    </p>
                </div>
            </div>
        </div>
    );
}