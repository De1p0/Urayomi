import { useState, useEffect, useMemo } from 'react';
import { getCurrentWindow } from '@tauri-apps/api/window';
import {
     MinusIcon,
     Square2StackIcon,
     StopIcon,
     XMarkIcon,
     ArrowLeftIcon
} from '@heroicons/react/24/outline';
import { useConfigStore } from '../../stores/ConfigStore';
import Searchbar from './SearchBar';
import React from 'react';
const NavBarRoutes = React.lazy(() => import("../../routes/NavBarRoutes"))

export default function TitleBar() {
     const [isMaximized, setIsMaximized] = useState(false);
     const appWindow = useMemo(() => getCurrentWindow(), []);
     const { updateConfig } = useConfigStore();

     useEffect(() => {
          const syncState = async () => setIsMaximized(await appWindow.isMaximized());
          syncState();
          const unlisten = appWindow.onResized(syncState);
          return () => { unlisten.then(cb => cb()); };
     }, [appWindow]);

     const btnClass = "inline-flex items-center justify-center w-11 h-full transition-all duration-200 text-gray-400 hover:text-white hover:bg-white/10";

     return (
          <header
               data-tauri-drag-region
               className="titlebar flex flex-row items-center w-full h-9 bg-[#0f172a] select-none"
          >
               <div className="flex items-center h-full">
                    <div className="flex items-center gap-2 px-3 select-none pointer-events-none">
                         <svg width="18" height="18" viewBox="0 0 200 200" className="opacity-90">
                              <rect x="20" y="20" width="160" height="160" rx="20" fill="none" className='stroke-primary-text' strokeWidth="12" />
                              <text x="100" y="85" className='fill-primary-text' fontWeight="900" fontSize="50" textAnchor="middle">URA</text>
                              <text x="100" y="145" className='fill-primary-text' fontWeight="900" fontSize="50" textAnchor="middle">YOMI</text>
                         </svg>
                         <span className="text-[10px] font-black tracking-[0.2em] uppercase text-primary-text">Urayomi</span>
                    </div>
               </div>

               <div className='h-full'>
                    <button
                         onClick={() => {
                              updateConfig((config) => {
                                   config.pageRoutes[config.currentPage].route = "/";
                              });
                         }}
                    >
                         <ArrowLeftIcon width={16} />
                    </button>
               </div>

               <div className="flex-1 flex"></div>
               {/* <Searchbar layer="surface" />
                */}
               <NavBarRoutes />
               <div className="flex-1 flex"></div>

               <div className="flex h-full">
                    <button onClick={() => appWindow.minimize()} className={btnClass} title="Minimize">
                         <MinusIcon className="w-4.5 h-4.5" />
                    </button>

                    <button onClick={() => appWindow.toggleMaximize()} className={btnClass} title={isMaximized ? "Restore" : "Maximize"}>
                         {isMaximized ? <Square2StackIcon className="w-4.5 h-4.5" /> : <StopIcon className="w-4.5 h-4.5" />}
                    </button>

                    <button onClick={() => appWindow.close()} className="inline-flex items-center justify-center w-11 h-full transition-all duration-200 text-gray-400 hover:text-white hover:bg-red-500/90" title="Close">
                         <XMarkIcon className="w-4.5 h-4.5" />
                    </button>
               </div>
          </header>
     );
}