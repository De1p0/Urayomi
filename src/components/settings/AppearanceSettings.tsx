import { EyeIcon } from "@heroicons/react/24/outline";
import ToggleButton from "../shared/ToggleButton";
import SelectDropDown from "../shared/SelectDropdown";
import { THEME_NAMES } from "../../stores/themes/themes";
import { useConfigStore } from "../../stores/ConfigStore";

export default function AppearanceSettings() {
    const { config, updateConfig, setTheme } = useConfigStore();

    return (
        <div className="p-4 bg-surface border border-primary-text/10 rounded relative">
            <div className="flex items-center gap-2">
                <EyeIcon className="w-4 h-4" />
                <h2 className="text-sm font-semibold">Appearance</h2>
            </div>
            <p className="text-xs text-primary-text/40 mt-1">Theme and UI options.</p>

            <div className="mt-4 relative space-y-2">

                <SelectDropDown
                    label="Theme"
                    value={config.theme}
                    options={THEME_NAMES}
                    onChange={(val) =>
                        setTheme(val)
                    }
                />

                <ToggleButton
                    label="Double Panel"
                    description="Two panels instead of one per page"
                    checked={config.layout.doublePanel}
                    onChange={(val) =>
                        updateConfig((config) => {
                            config.layout.doublePanel = val;
                        })
                    }
                />

                <ToggleButton
                    label="Right To Left"
                    description="Show manga panels in a RTL layout"
                    checked={config.layout.rightToLeft}
                    onChange={(val) =>
                        updateConfig((config) => {
                            config.layout.rightToLeft = val;
                        })
                    }
                />

            </div>
        </div>
    );
}