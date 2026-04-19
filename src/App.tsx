
import "./App.css";
import "./stores/themes/themes.css";
import TitleBar from "./components/layout/TitleBar";
import Sidebar from "./components/layout/SideBar";
import "./core/Sources/SourceLoader"
import React, { useEffect } from "react";
import { applyTheme, useConfigStore } from "./stores/ConfigStore";
import { corFetch } from "./api/corFetch";
import { loadSource } from "./core/Sources/SourceLoader";
import { useSourceRegistry } from "./stores/SourceStore";
const AppRoutes = React.lazy(() => import("./routes/AppRoutes"))
function App() {
  const { config } = useConfigStore();
  const { setSource } = useSourceRegistry();

  useEffect(() => {

    applyTheme(config.theme);

    const handleExtensionLoad = async () => {
      const extensions = await Promise.all(
        config.sources.map(async (source) => {
          const ExtensionClass = await loadSource(source.script);
          return new ExtensionClass(corFetch);
        })
      );

      extensions.forEach(source => {
        setSource(source.source.name, source)
        console.log(source, "Shit");
      })
    };

    handleExtensionLoad();
  }, [])

  return (
    <div className={`w-screen h-screen flex flex-row overflow-hidden relative bg-surface`}>
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
