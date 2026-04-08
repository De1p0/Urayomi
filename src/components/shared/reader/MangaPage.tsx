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
    const sizeClass = half ? "max-w-1/2" : "max-w-full";

    if (!src) {
        return (
            <div
                className={`max-h-full ${sizeClass} flex items-center justify-center rounded-lg bg-neutral-900 select-none`}
            >
                {fallback}
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            className={`max-h-full ${sizeClass} object-contain rounded-lg drop-shadow-2xl select-none pointer-events-none`}
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
        />
    );
}