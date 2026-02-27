
import "./App.css";
import TitleBar from "./components/TitleBar";
import Sidebar from "./components/SideBar";

function App() {
  return (
    <div className="w-screen h-screen flex flex-row overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col bg-surface">

        <TitleBar />

        <main className="flex-1 bg-background rounded-tl-2xl p-6 text-black">
        </main>

      </div>
    </div>
  );
}

export default App;
