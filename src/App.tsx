
import "./App.css";
import "./stores/themes/themes.css";
import TitleBar from "./components/layout/TitleBar";
import Sidebar from "./components/layout/SideBar";
import AppRoutes from "./routes/AppRoutes";
import "./ExtensionHandler/SourceLoader"
import { getSourceList, loadSource } from "./ExtensionHandler/SourceLoader";
import { useEffect } from "react";
import { corFetch } from "./coreFetch";
import { SourceResponse } from "./types/Extension";
import { applyTheme, useConfigStore } from "./stores/configStore";

function App() {
  const { config, setConfig } = useConfigStore();

  useEffect(() => {
    // setConfig("isMobile", false); // this is for debug only, please remove on official release

    applyTheme(config.theme);

    const handleExtensionLoad = async () => {
      const extensions = await Promise.all(
        config.sources.map(async (source) => {
          const ExtensionClass = await loadSource(source.script);
          return new ExtensionClass(corFetch);
        })
      );

      setConfig("installedSources", extensions);
    };

    handleExtensionLoad();
  }, []);

  return (
    <div className={`w-screen ${"h-screen"} flex flex-row overflow-hidden relative bg-surface`}>
      {!config.isMobile && <Sidebar />}

      <div className={`flex-1 flex flex-col bg-surface overflow-hidden ${!config.isMobile && "ml-13"}`}>
        {!config.isMobile && <TitleBar />}
        <main className={`flex-1 bg-background ${!config.isMobile && "rounded-tl-2xl"} text-black overflow-y-scroll scrollbar-hide overflow-x-hidden`}>
          <AppRoutes />
        </main>
        {config.isMobile && <Sidebar />}
      </div>
    </div>
  );
}
export default App;
