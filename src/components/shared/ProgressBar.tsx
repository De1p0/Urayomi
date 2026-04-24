import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { useConfigStore } from "../../stores/ConfigStore";

interface ProgressBarProps {
    page: number;
    total: number;
    onChange: (page: number) => void;
}

export default function ProgressBar({ page, total, onChange }: ProgressBarProps) {
    const progressBarRef = useRef<HTMLDivElement>(null);
    const { config } = useConfigStore();

    const [isDragging, setIsDragging] = useState(false);
    const [dragVisualPct, setDragVisualPct] = useState<number | null>(null);
    const [hoverPct, setHoverPct] = useState<number | null>(null);

    const isRTL = config.layout.rightToLeft;

    const displayPercentage = useMemo(() => {
        if (isDragging && dragVisualPct !== null) return dragVisualPct * 100;
        if (total < 1) return 0;
        return ((page / (total - 1)) * 100);
    }, [isDragging, dragVisualPct, page, total]);

    const activePageNum = useMemo(() => {
        const pct = isDragging && dragVisualPct !== null
            ? dragVisualPct
            : (hoverPct ?? (page / (total - 1)));
        return Math.round(pct * (total - 1)) + 1;
    }, [isDragging, dragVisualPct, hoverPct, page, total]);


    const handleUpdate = useCallback(
        (clientX: number) => {
            if (!progressBarRef.current) return;

            const rect = progressBarRef.current.getBoundingClientRect();
            let pct = (clientX - rect.left) / rect.width;
            pct = Math.max(0, Math.min(1, pct));

            const logicPct = isRTL ? 1 - pct : pct;
            setDragVisualPct(logicPct);

            const newPage = Math.round(logicPct * (total - 1));
            if (newPage !== page) {
                onChange(newPage);
            }
        },
        [total, onChange, isRTL, page]
    );

    useEffect(() => {
        if (!isDragging) {
            setDragVisualPct(null);
            return;
        }

        const onMove = (e: MouseEvent | TouchEvent) => {
            const x = "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
            handleUpdate(x);
        };

        const onEnd = () => setIsDragging(false);

        document.addEventListener("mousemove", onMove, { passive: true });
        document.addEventListener("mouseup", onEnd);
        document.addEventListener("touchmove", onMove, { passive: false });
        document.addEventListener("touchend", onEnd);

        return () => {
            document.removeEventListener("mousemove", onMove);
            document.removeEventListener("mouseup", onEnd);
            document.removeEventListener("touchmove", onMove);
            document.removeEventListener("touchend", onEnd);
        };
    }, [isDragging, handleUpdate]);


    const displayFix = Math.min(100, Math.max(0, displayPercentage))

    useEffect(() => {
        console.log(page, total, displayFix, displayPercentage)
    }, [page])


    return (
        <div className="w-full select-none py-2 px-4 space-y-1">
            <div className="flex items-center gap-4">
                <div
                    ref={progressBarRef}
                    className="relative flex-1 h-8 flex items-center cursor-pointer group"
                    onMouseDown={(e) => {
                        setIsDragging(true);
                        handleUpdate(e.clientX);
                    }}
                    onTouchStart={(e) => {
                        setIsDragging(true);
                        handleUpdate(e.touches[0].clientX);
                    }}
                    onMouseMove={(e) => {
                        const rect = progressBarRef.current?.getBoundingClientRect();
                        if (!rect) return;
                        const pct = (e.clientX - rect.left) / rect.width;
                        setHoverPct(isRTL ? 1 - pct : pct);
                    }}
                    onMouseLeave={() => setHoverPct(null)}
                >
                    <div className="absolute w-full h-1 bg-background/60 rounded-full" />

                    <div
                        className={`absolute h-1 bg-accent rounded-full pointer-events-none ${isDragging ? "" : "transition-[width] ease-out duration-100"
                            }`}
                        style={{
                            width: `${displayFix}%`,
                            [isRTL ? 'right' : 'left']: 0
                        }}
                    />

                    {(isDragging || hoverPct !== null) && (
                        <div
                            className="absolute -top-7 z-50 pointer-events-none transition-opacity duration-100"
                            style={{
                                left: isRTL
                                    ? `${100 - (isDragging ? displayFix : hoverPct! * 100)}%`
                                    : `${isDragging ? displayFix : hoverPct! * 100}%`,
                                transform: 'translateX(-50%)'
                            }}
                        >
                            <div className="bg-surface text-primary-text text-[10px] font-bold px-2 py-1 rounded border border-primary-text/30">
                                {activePageNum}
                            </div>
                        </div>
                    )}

                    <div
                        className={`absolute w-3 h-3 bg-white rounded-full shadow-md pointer-events-none ${isDragging ? "scale-125" : "scale-100 group-hover:scale-110 duration-100"
                            }`}
                        style={{
                            [isRTL ? 'right' : 'left']: `${displayFix}%`,
                            transform: isRTL ? 'translateX(50%)' : 'translateX(-50%)'
                        }}
                    />
                </div>
            </div>


        </div>
    );
}