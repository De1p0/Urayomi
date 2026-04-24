import { fetch } from "@tauri-apps/plugin-http";

function encodeUrl(url: string) {
    const u = new URL(url);

    const params = new URLSearchParams();
    for (const [key, value] of u.searchParams.entries()) {
        params.append(key, value);
    }

    u.search = params.toString();
    return u.toString();
}

export const corFetch = (url: string) => {
    const encodedUrl = encodeUrl(url);
    console.log(url)
    return fetch(encodedUrl, {
        headers: {
            "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        },
    });
};