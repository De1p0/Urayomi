import { useEffect, useState } from "react";

interface MangaPageProps {
    src?: string | null;
    alt?: string;
    fallback?: React.ReactNode;
    half?: boolean;
}

export function MangaPage({
    src,
    alt,
    fallback,
    half = false,
}: MangaPageProps) {
    const [loading, setLoading] = useState(true);
    const sizeClass = half ? "max-w-1/2" : "max-w-full";

    useEffect(() => {
        if (src) setLoading(true);
    }, [src]);

    if (!src) {
        return (
            <div className={`max-h-full ${sizeClass} flex items-center justify-center`}>
                {fallback}
            </div>
        );
    }

    return (
        <div className="relative max-h-full flex items-center justify-center">
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="spinner" />
                </div>
            )}

            <img
                src={src}
                alt={alt}
                loading="lazy"
                className={`max-h-[85vh] ${sizeClass} w-auto object-contain rounded-lg drop-shadow-2xl select-none pointer-events-none transition-opacity duration-200 ${loading ? "opacity-0" : "opacity-100"
                    }`}

                draggable={false}
                onDragStart={(e) => e.preventDefault()}
                onLoad={() => setLoading(false)}
                onError={() => setLoading(false)}
            />
        </div>
    );
}