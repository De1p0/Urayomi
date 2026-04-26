
import { useEffect } from "react";
import { applyTheme, useConfigStore } from "../stores/ConfigStore";



export function useApplyTheme() {
    const { config } = useConfigStore();

    useEffect(() => {
        applyTheme(config.theme);
    }, [])
}