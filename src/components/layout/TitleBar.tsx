import { useState, useEffect, useMemo } from 'react';
import { getCurrentWindow } from '@tauri-apps/api/window';
import {
     MinusIcon,
     Square2StackIcon,
     StopIcon,
     XMarkIcon,
     MagnifyingGlassIcon,
     ChevronDownIcon
} from '@heroicons/react/24/outline';
import { useConfigStore } from '../../stores/configStore';
import { useNavigate } from 'react-router-dom';


export default function TitleBar() {
     const [isMaximized, setIsMaximized] = useState(false);
     const appWindow = useMemo(() => getCurrentWindow(), []);
     const [query, setQuery] = useState("")
     const { config, setConfig } = useConfigStore();
     const navigate = useNavigate();



     
     async function handleSearch() {
          if (!query.trim()) return;

          let results: any = []; // holy FUCK im sleep deprived i cant do this no more idc if im using the any type now
                    // results of the FUCKING SEARCH DFGSHIUGDFOIUH 

          for (const source of config.installedSources) {
               const res = await source.search(query, 1, []);
               if (res?.list) {
                      results = [...results, ...res.list];
               }
          }

          navigate("/search", { state: { results, query } });
          

     }

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
               <div className="flex-1 flex"></div>

               <div className="w-full max-w-md px-4">
                    <div className="relative group w-full">
                         <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                              <MagnifyingGlassIcon className="w-3.5 h-3.5 text-gray-500 group-focus-within:text-accent/50 transition-colors" onClick={() => handleSearch()} />
                         </div>
                         <input
                              type="text"
                              onChange={(e) => setQuery(e.target.value)}
                              onKeyDown={(e) => {
                                   if (e.key === "Enter") {
                                        handleSearch();
                                   }
                              }}
                              placeholder="Search manga..."
                              className="w-full bg-background border border-white/5 text-xs text-primary-text rounded py-1 pl-7 pr-2 focus:outline-none focus:bg-background/90 focus:border-accent/90 transition-all"
                         />
                    </div>
               </div>


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