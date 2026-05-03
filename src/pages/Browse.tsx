import { loadSource } from "../core/Sources/SourceLoader";
import { corFetch } from "../api/corFetch";
import { useConfigStore } from "../stores/ConfigStore";
import { SourceResponse } from "../types/Api";
import { useSourceRegistry } from "../stores/SourceStore";

export default function Browse() {
    const { config, updateConfig } = useConfigStore();
    const { sources, setSource, removeSource } = useSourceRegistry();

    const handleInstall = async (sourceItem: SourceResponse) => {
        const currentInstalled = config?.installedSourcesName ?? [];

        const updatedInstalled = currentInstalled.some(
            s => s.name === sourceItem.name
        )
            ? currentInstalled.filter(source => source.name != sourceItem.name)
            : [...currentInstalled, sourceItem];

        updateConfig((config) => {
            config.installedSourcesName = updatedInstalled;
        })

        for (const source of updatedInstalled) {
            try {
                const ExtensionClass = await loadSource(source);
                const extension = new ExtensionClass(corFetch);
                setSource(source.name.toString(), extension);
                console.log(sources)
            } catch (error) {
                console.error(`Failed to load source ${source.name}:`, error);
                removeSource(source.name.toString());
            }
        }

        for (const sourceId of Object.keys(sources)) {
            if (!updatedInstalled.some(s => s.name.toString() === sourceId)) {
                removeSource(sourceId);
            }
        }

        console.log("Installing source", sourceItem)
    };


    return (
        <div className="w-full h-full p-4 sm:p-8">
            <header className="mb-4 sm:mb-6">
                <h1 className="text-xl sm:text-2xl font-bold text-primary-text tracking-tight">
                    Sources
                </h1>
            </header>

            <div className={`flex flex-row gap-3 pb-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory w-full px-4 sm:px-0 box-border flex-wrap`}>
                {config?.sources?.map((source, index) => (
                    <div
                        key={index}
                        className="flex flex-col gap-3 p-3 sm:p-4 rounded-xl bg-secondary-bg/30 border border-primary-text/10 shrink-0 w-56 sm:w-64 snap-start transition-all"
                    >
                        <div className="flex items-center gap-3 sm:gap-4">
                            <div className="relative h-12 w-12 sm:h-14 sm:w-14 shrink-0  rounded-lg bg-surface">
                                <img
                                    src={source.iconUrl}
                                    alt={source.name}
                                    className="h-full w-full object-cover"
                                />
                                <div className="absolute inset-0 rounded-lg" />
                            </div>

                            <div className="flex flex-col min-w-0 flex-1">
                                <span className="text-sm font-bold text-primary-text truncate capitalize">
                                    {source.name}
                                </span>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                    <span className="text-[10px] font-bold text-primary-text/30 uppercase tracking-tighter bg-primary-text/5 px-1.5 py-0.5 rounded">
                                        {source.lang}
                                    </span>
                                    <span className="text-[11px] text-primary-text/40 font-medium">
                                        Source
                                    </span>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => handleInstall(source)}
                            className={`w-full py-2 px-4 rounded-lg touch-manipulation active:opacity-70 ${sources[source.id]?.source?.name
                                ? "bg-primary-text/80"
                                : "bg-primary-text/90"
                                } text-surface/80 text-xs font-bold transition-opacity cursor-pointer`}
                        >
                            {sources[source.id]?.source?.name ? "Installed" : "Install"}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}