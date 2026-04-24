import { useState } from "react";

type ToggleButtonProps = {
    label?: string;
    description?: string;
    onChange?: (enabled: boolean) => void;
    checked: boolean
};

export default function ToggleButton({
    label = "feature name",
    description = "asdasd",
    onChange,
    checked = false
}: ToggleButtonProps) {
    const [isEnabled, setIsEnabled] = useState(checked);


    const handleToggle = () => {
        const newState = !isEnabled;
        setIsEnabled(newState);
        if (onChange) onChange(newState);
    };

    return (
        <div className="flex items-center justify-between p-4 bg-surface border border-primary-text/10 rounded">
            <div>
                <p className="text-sm font-medium">{label}</p>
                {description && <p className="text-xs text-primary-text/40">{description}</p>}
            </div>

            <button
                onClick={handleToggle}
                className={`
          relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent
          transition-colors duration-200 ease-in-out focus:outline-none
          ${isEnabled ? "bg-accent" : "bg-primary-text/10"}
        `}
            >
                <span
                    aria-hidden="true"
                    className={`
            pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0
            transition duration-200 ease-in-out
            ${isEnabled ? "translate-x-5" : "translate-x-0"}
          `}
                />
            </button>
        </div>
    );
}