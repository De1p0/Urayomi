
import "./App.css";
import TitleBar from "./components/TitleBar";
import Sidebar from "./components/SideBar";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (

    <div className="w-screen h-screen flex flex-row overflow-hidden relative">
      <Sidebar />


      <div className="flex-1 flex flex-col bg-surface ml-13">

        <TitleBar />

        <main className="flex-1 bg-background rounded-tl-2xl p-6 text-black">
          {/* this is for SPA, redirecting to pages ruins UX */}
          <AppRoutes />
        </main>

      </div>
    </div>
  );
}

export default App;
