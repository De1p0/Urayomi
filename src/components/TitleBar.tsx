import { useState, useEffect, useMemo } from 'react';
import { getCurrentWindow } from '@tauri-apps/api/window';
import {
     MinusIcon,
     Square2StackIcon,
     StopIcon,
     XMarkIcon,
     MagnifyingGlassIcon
} from '@heroicons/react/24/outline';


export default function TitleBar() {
     const [isMaximized, setIsMaximized] = useState(false);
     const appWindow = useMemo(() => getCurrentWindow(), []);

     useEffect(() => {
          const syncState = async () => setIsMaximized(await appWindow.isMaximized());
          syncState();
          const unlisten = appWindow.onResized(syncState);
          return () => { unlisten.then(cb => cb()); };
     }, [appWindow]);

     const btnClass = "inline-flex items-center justify-center w-11 h-full transition-all duration-200 text-gray-400 hover:text-white hover:bg-white/10";
     const closeBtnClass = "inline-flex items-center justify-center w-11 h-full transition-all duration-200 text-gray-400 hover:text-white hover:bg-red-500/90";

     return (
          <header
               data-tauri-drag-region
               className="titlebar flex flex-row items-center justify-between w-full h-9 bg-[#0f172a] select-none"
          >
               <div className="flex items-center h-full">

                    <div className="flex items-center gap-2 px-3 select-none pointer-events-none">
                         <svg width="18" height="18" viewBox="0 0 200 200" className="opacity-90">
                              <rect x="20" y="20" width="160" height="160" rx="20" fill="none" stroke="currentColor" strokeWidth="12" />
                              <text x="100" y="85" fill="currentColor" fontWeight="900" fontSize="50" textAnchor="middle">URA</text>
                              <text x="100" y="145" fill="currentColor" fontWeight="900" fontSize="50" textAnchor="middle">YOMI</text>
                         </svg>
                         <span className="text-[10px] font-black tracking-[0.2em] uppercase text-white/80">Urayomi</span>
                    </div>
               </div>

               <div className="flex-1 max-w-md px-4 no-drag">
                    <div className="relative group">
                         <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                              <MagnifyingGlassIcon className="w-3.5 h-3.5 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                         </div>
                         <input
                              type="text"
                              placeholder="Search..."
                              className="w-full bg-white/5 border border-white/5 text-xs text-gray-200 rounded py-1 pl-7 pr-2 focus:outline-none focus:bg-white/10 focus:border-white/20 transition-all"
                         />
                    </div>
               </div>

               <div className="flex h-full">
                    <button onClick={() => appWindow.minimize()} className={btnClass} title="Minimize">
                         <MinusIcon className="w-4.5 h-4.5" />
                    </button>

                    <button onClick={() => appWindow.toggleMaximize()} className={btnClass} title={isMaximized ? "Restore" : "Maximize"}>
                         {isMaximized ? <Square2StackIcon className="w-4.5 h-4.5" /> : <StopIcon className="w-4.5 h-4.5" />}
                    </button>

                    <button onClick={() => appWindow.close()} className={closeBtnClass} title="Close">
                         <XMarkIcon className="w-4.5 h-4.5" />
                    </button>
               </div>
          </header>
     );
}