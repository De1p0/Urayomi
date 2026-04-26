
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
                    console.log(source, " loaded source")
                    const ExtensionClass = await loadSource(source.script);
                    return new ExtensionClass(corFetch) as DefaultExtension;
                })
            );

            extensions.forEach(source => {
                setSource(source.source.name, source)
                console.log(source.getDetail, "Shit");
            })
        };

        handleExtensionLoad();
    }, []);

}