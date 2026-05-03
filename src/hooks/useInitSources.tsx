
import { useEffect } from "react";
import { loadSource } from "../core/Sources/SourceLoader";
import { corFetch } from "../api/corFetch";
import { DefaultExtension } from "../types/Extension";
import { useConfigStore } from "../stores/ConfigStore";
import { useSourceRegistry } from "../stores/SourceStore";



export function useInitSources() {
    const { config } = useConfigStore();
    const { setSource } = useSourceRegistry();

    useEffect(() => {
        const handleExtensionLoad = async () => {
            const extensions = await Promise.all(
                config.sources.map(async (source) => {
                    if (config.installedSourcesName.some(s => s.id == source.id)) return;

                    const ExtensionClass = await loadSource(source);
                    return new ExtensionClass(corFetch);
                })
            );

            extensions.forEach(instance => {
                if (!instance) return;

                setSource(instance.source.name, instance as DefaultExtension);
            });
        };

        handleExtensionLoad();
    }, []);
}