import { ArrowDownOnSquareIcon } from "@heroicons/react/24/outline";

export default function DownloadsSettings() {
    return (
        <div className="md:col-span-2 p-4 bg-surface border border-primary-text/10 rounded">
            <div className="flex items-center gap-2">
                <ArrowDownOnSquareIcon className="w-4 h-4" />
                <h2 className="text-sm font-semibold">Downloads</h2>
            </div>
            <p className="text-xs text-primary-text/40 mt-1">Set your download path.</p>
            <div className="mt-4 flex gap-2">
                <input
                    className="flex-1 bg-surface border border-primary-text/10 rounded px-3 py-2 text-sm outline-none focus:border-accent/50"
                    placeholder="/home/user/downloads"
                />
            </div>
        </div>
    );
}    