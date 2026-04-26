
import "./App.css";
import "./stores/themes/themes.css";
import TitleBar from "./components/layout/TitleBar";
import Sidebar from "./components/layout/SideBar";
import "./core/Sources/SourceLoader"
import React from "react";
import { useConfigStore } from "./stores/ConfigStore";

import { useInitSources } from "./hooks/useInitSources";
import { useApplyTheme } from "./hooks/useApplyTheme";
const AppRoutes = React.lazy(() => import("./routes/AppRoutes"))
function App() {
  const { config } = useConfigStore();

  useApplyTheme()
  useInitSources();

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
