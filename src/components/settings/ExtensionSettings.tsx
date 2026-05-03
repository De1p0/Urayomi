import { PuzzlePieceIcon } from "@heroicons/react/24/outline";
import { useConfigStore } from "../../stores/ConfigStore";
import { getSourceList } from "../../core/Sources/SourceLoader";
import { useEffect, useState } from "react";
import { loadSource } from "../../core/Sources/SourceLoader";
import { corFetch } from "../../api/corFetch";
import { Source, useSourceRegistry } from "../../stores/SourceStore";
import { SourceResponse } from "../../types/Api";

export default function ExtensionsSettings() {
    const { config, updateConfig } = useConfigStore();
    const { sources, setSource, removeSource } = useSourceRegistry();
    const [sourceInput, setSourceInput] = useState(config.sourceList || "");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setSourceInput(config.sourceList || "");
    }, [config.sourceList]);

    const handleInstallExtension = async () => {
        setLoading(true);
        try {
            const newSources = await getSourceList(sourceInput);

            for (const sourceId of Object.keys(sources)) {
                removeSource(sourceId);
            }

            for (const sourceResponse of newSources) {
                if ((sourceResponse as SourceResponse).sourceCodeUrl.includes("dart")) continue;
                try {
                    const ExtensionClass = await loadSource(sourceResponse);
                    const extension = new ExtensionClass(corFetch);
                    setSource(sourceResponse.id, extension);
                } catch (error) {
                    console.error(`Failed to load source ${sourceResponse.name}:`, error);
                }
            }

            updateConfig((config) => {
                config.sources = (newSources as SourceResponse[]).filter(x => !x.sourceCodeUrl.includes("dart"))
                config.sourceList = sourceInput;
            });

            console.log("Sources loaded successfully");
        } catch (error) {
            console.error("Failed to install extensions:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setSourceInput(config.sourceList || "");
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
                    value={sourceInput}
                    onChange={(e) => setSourceInput(e.target.value)}
                    disabled={loading}
                    className="w-full h-24 bg-background/50 border border-primary-text/10 rounded p-3 text-sm font-mono outline-none focus:border-accent/50 resize-none disabled:opacity-50"
                    placeholder="Paste JSON or script URL here..."
                />

                <div className="flex w-full justify-end gap-2">
                    {sourceInput !== config.sourceList && (
                        <button
                            onClick={handleCancel}
                            disabled={loading}
                            className="px-4 py-2 text-primary-text/60 hover:text-primary-text text-sm font-medium transition-colors disabled:opacity-50"
                        >
                            Cancel
                        </button>
                    )}

                    <button
                        onClick={handleInstallExtension}
                        disabled={loading}
                        className="px-6 py-2 bg-accent text-primary-text rounded text-sm font-medium transition-opacity hover:opacity-90 disabled:opacity-50"
                    >
                        {loading ? "Installing..." : "Save"}
                    </button>
                </div>
            </div>
        </div>
    );
}