import { DefaultExtension } from "../../types/Extension";

export function importSource(source: string) {

}

// https://raw.githubusercontent.com/De1p0/Urayomi-Extensions/Urayomi-Extensions/index.json
export async function getSourceList(url: string) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch script: ${response.status}`);

    const json = await response.json();
    console.log(JSON.stringify(json, null, 4),
        "json"
    )
    return json
}

export async function loadSource(scriptUrl: string) {
    const response = await fetch(scriptUrl);

    if (!response.ok) throw new Error(`Failed to fetch script: ${response.status}`);

    const script = await response.text();

    const blob = new Blob([script], {
        type: "application/javascript",
    });

    const blobUrl = URL.createObjectURL(blob);

    try {
        const module = await import(/* @vite-ignore */ blobUrl);
        return module.DefaultExtension;
    } finally {
        URL.revokeObjectURL(blobUrl);
    }
}

/*
  const ExtensionClass = await loadSource(
          "https://raw.githubusercontent.com/De1p0/Urayomi-Extensions/refs/heads/main/sources/mangadex.js"
        );

        const source = new ExtensionClass();

        console.log(source.source, " AA");
      } catch (err) {
        console.error("Failed to load extension:", err);
      }
*/