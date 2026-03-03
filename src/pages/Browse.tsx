import { loadSource } from "../ExtensionHandler/SourceLoader";
import { useConfigStore } from "../stores/configStore";
import { DefaultExtension, SourceResponse } from '../types/ExtensionData';
import { corFetch } from "../coreFetch";

export default function Browse() {
    const { config, setConfig } = useConfigStore();

    const handleInstall = async (sourceItem: SourceResponse) => {
        const currentInstalled = config?.installedSourcesName ?? [];



        const updatedInstalled = currentInstalled.some(
            s => s.script === sourceItem.script
        )
            ? currentInstalled.filter(source => source.id != sourceItem.id)
            : [...currentInstalled, sourceItem];

        setConfig("installedSourcesName", updatedInstalled);

        const extensions = await Promise.all(
            updatedInstalled.map(async (source: SourceResponse) => {
                const ExtensionClass = await loadSource(source.script);
                return new ExtensionClass(corFetch);
            })
        );

        console.log(extensions, "fuhh");

        setConfig("installedSources", extensions);
    };
    return (
        <div className="w-full h-full p-8">
            <header className="mb-6">
                <h1 className="text-2xl font-bold text-primary-text tracking-tight">
                    Sources
                </h1>
            </header>

            <div className="flex flex-row gap-4 overflow-x-auto pb-6 scrollbar-hide snap-x">
                {config?.sources?.map((source, index) => (
                    <div
                        key={source.id || index}
                        className="flex flex-col gap-4 p-4 rounded-xl bg-secondary-bg/30 border border-primary-text/10 shrink-0 w-64 snap-start transition-all"
                    >
                        <div className="flex items-center gap-4">
                            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-surface">
                                <img
                                    src={source.cover}
                                    alt={source.id}
                                    className="h-full w-full object-cover"
                                />
                                <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-lg" />
                            </div>

                            <div className="flex flex-col min-w-0 flex-1">
                                <span className="text-sm font-bold text-primary-text truncate capitalize">
                                    {source.id}
                                </span>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                    <span className="text-[10px] font-bold text-primary-text/30 uppercase tracking-tighter bg-primary-text/5 px-1.5 py-0.5 rounded">
                                        {/* EN */}


                                        LANG
                                    </span>
                                    <span className="text-[11px] text-primary-text/40 font-medium">
                                        Source
                                    </span>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={(e) => {
                                handleInstall(source)
                            }}
                            className={`w-full py-2 px-4 rounded-lg ${config.installedSourcesName.some(s => s.id == source.id) ? "bg-primary-text/80" : "bg-primary-text/90"} text-surface/80 text-xs font-bold transition-opacity cursor-pointer`}
                        >
                            {config.installedSourcesName.some(s => s.id == source.id) ? "Installed" : "Install"}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}