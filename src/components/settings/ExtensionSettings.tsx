import { PuzzlePieceIcon } from "@heroicons/react/24/outline";
import { useConfigStore } from "../../stores/configStore";
import { getSourceList } from "../../ExtensionHandler/SourceLoader";
import { useEffect, useState } from "react";

export default function ExtensionsSettings() {
    const { config, setConfig } = useConfigStore();
    const [sources, setSources] = useState(config.sourceList || "");

    useEffect(() => {
        setSources(config.sourceList || "");
    }, [config.sourceList]);

    const handleInstallExtension = async () => {

        setConfig("sources", []);
        setConfig("installedSources", []);
        setConfig("installedSourcesName", []);

        const newSources = await getSourceList(sources);
        setConfig("sourceList", sources);
        setConfig("sources", newSources);

    };

    const handleCancel = () => {
        setSources(config.sourceList || "");
    };

    return (
        <div className="md:col-span-3 p-4 bg-surface border border-primary-text/10 rounded">
            <div className="flex items-center gap-2">
                <PuzzlePieceIcon className="w-4 h-4" />
                <h2 className="text-sm font-semibold">Manga Extensions</h2>
            </div>
            <p className="text-xs text-primary-text/40 mt-1">
                Paste an extension script or repository URL to add new sources.
            </p>

            <div className="mt-4 flex flex-col gap-3">
                <textarea
                    value={sources}
                    onChange={(e) => setSources(e.target.value)}
                    className="w-full h-24 bg-background/50 border border-primary-text/10 rounded p-3 text-sm font-mono outline-none focus:border-accent/50 resize-none"
                    placeholder="Paste JSON or script URL here..."
                />

                <div className="flex w-full justify-end gap-2">
                    {sources !== config.sourceList && (
                        <button
                            onClick={handleCancel}
                            className="px-4 py-2 text-primary-text/60 hover:text-primary-text text-sm font-medium transition-colors"
                        >
                            Cancel
                        </button>
                    )}

                    <button
                        onClick={handleInstallExtension}
                        className={`px-6 py-2 bg-accent text-primary-text rounded text-sm font-medium transition-opacity hover:opacity-90
                            }`}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}